import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { exclude } from "@/utils/exclude";
import { actionError, actionSuccess } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if(!session || !session.user) {
      return NextResponse.json(
        actionError("Unauthorized: Must be a patient", null, 401),
        { status: 401 }
      );
    }


    const UserExist = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
    if (!UserExist) {
      return NextResponse.json(
        actionError("Unauthorized: Must be a patient", null, 401),
        { status: 401 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: session?.user.id,
      },
      include: {
        service: {
          select: {
            name: true,
            description: true,
            price: true,
            duration: true,
          },
        },
        doctor: {
          select: {
            name: true,
            email: true,
            image: true,
            doctorProfile: {
              select: {
                specialty: true,
                bio: true,
                qualifications: true,
                photoUrl: true,
              },
            },
          },
        },
      },
    });



    return NextResponse.json(actionSuccess("success", appointments));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      actionError("Something went wrong", null, 500),
      { status: 500 }
    );
  }
}
