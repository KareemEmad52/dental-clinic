import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import { actionError, actionSuccess } from "@/utils/response";
import { BookingConfirmationEmail } from "@/components/Emails/BookingConfirmation";




// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAILLOOP_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail app password
  },
});

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const bookingDetails = await req.json();
    
    // Validate input
    const requiredFields = ['to', 'date', 'time', 'service', 'dentist', 'location', 'address', 'patientName', 'bookingId'];
    for (const field of requiredFields) {
      if (!bookingDetails[field]) {
        return NextResponse.json(
          actionError(`Missing required field: ${field}`, null, 400)
        );
      }
    }
    
    // Render the React Email component to HTML with the booking details
    // Await the result to ensure we have a string for nodemailer
    const emailHtml = await Promise.resolve(render(BookingConfirmationEmail({ bookingDetails })));
    
    // Send email using nodemailer
    const mailOptions = {
      from: process.env.GMAILLOOP_USER,
      to: bookingDetails.to,
      subject: 'Your Dental Appointment Confirmation',
      html: emailHtml, // Now this is a string, not a Promise
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    return NextResponse.json(
      actionSuccess("Email sent successfully", { sent: true })
    );
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      actionError("Failed to send email", error, 500)
    );
  }
}