import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = {
      user: {
        name: "kareem emad",
        email: "kareememad209@gmail.com",
        image:
          "https://lh3.googleusercontent.com/a/ACg8ocKb3eTDznYfsvn0r8GKjCq5Pb_qx4A_DVnrrPOfjPGvZYRxYXj4=s96-c",
        id: "cmafh47y00001hr3kcigjl1l9",
        role: "PATIENT",
        phone: "01154027591",
        address: null,
        gender: "MALE",
        dateOfBirth: "2003-02-12T22:00:00.000Z",
        provider: "OAUTH",
      },
      expires: "2025-06-16T15:46:44.361Z",
    };
    if (!session || !session.user || session.user.role !== "PATIENT") {
      return NextResponse.json(
        actionError("Unauthorized: Must be a patient", null, 401),
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(actionError("Invoice not found", null, 404), {
        status: 404,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(actionError("User not found", null, 404), {
        status: 404,
      });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: id },
      include: {
        appointment: {
          select: {
            startTime: true,
            status: true,
            service: {
              select: {
                name: true,
                duration: true,
                price: true,
              },
            },
            doctor: {
              select: {
                name: true,
                email: true,
              },
            },
            patient: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(actionSuccess("success", invoice));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      actionError("Failed to fetch invoice", error, 500)
    );
  }
}
