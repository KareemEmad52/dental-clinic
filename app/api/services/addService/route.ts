import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define Zod schema for service validation
const serviceSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Authorization check
    if (!session?.user || session.user.role !== Role.DOCTOR) {
      return NextResponse.json(
        actionError("Unauthorized: Must be a doctor", null, 401),
        { status: 401 }
      );
    }

    // Check if request body exists
    if (!req.body) {
      return NextResponse.json(
        actionError("Request body is required", null, 400),
        { status: 400 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        actionError("Invalid JSON format in request body", null, 400),
        { status: 400 }
      );
    }

    // Validate input with Zod
    const validationResult = serviceSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(issue => 
        `${issue.path.join('.')}: ${issue.message}`
      ).join(', ');
      
      return NextResponse.json(
        actionError(`Validation failed: ${errorMessages}`, null, 400),
        { status: 400 }
      );
    }

    // Data is now properly typed thanks to Zod
    const { name, description, price, duration } = validationResult.data;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        duration,
      },
    });

    return NextResponse.json(
      actionSuccess("Service created successfully", service),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      actionError("Failed to create service", error instanceof Error ? error.message : null, 500),
      { status: 500 }
    );
  }
}