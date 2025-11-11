import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter function to ensure env vars are loaded
function createTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    throw new Error(
      "Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in your .env.local file.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword.replace(/\s/g, ""), // Remove any spaces from app password
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Create transporter (will throw if credentials are missing)
    let transporter: ReturnType<typeof createTransporter>;
    try {
      transporter = createTransporter();
    } catch (error) {
      console.error("Transporter creation error:", error);
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Email service not configured",
        },
        { status: 500 },
      );
    }

    // Get the recipient email from environment or use default
    const recipientEmail =
      process.env.CONTACT_EMAIL || "hello@haelostudios.com";

    // Prepare email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #9381ff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ""}
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p>This email was sent from the Haelo Studios contact form.</p>
        </div>
      </div>
    `;

    // Send email using Gmail SMTP
    const mailOptions = {
      from: `"Haelo Studios Contact Form" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully", messageId: info.messageId },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in contact API route:", error);

    // Provide more detailed error message
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
      // Don't expose sensitive details in production
      if (
        errorMessage.includes("Invalid login") ||
        errorMessage.includes("authentication")
      ) {
        errorMessage =
          "Email authentication failed. Please check your Gmail credentials.";
      } else if (
        errorMessage.includes("ECONNECTION") ||
        errorMessage.includes("ETIMEDOUT")
      ) {
        errorMessage =
          "Could not connect to email service. Please try again later.";
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
