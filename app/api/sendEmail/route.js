import { Email } from '@/emails';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const res = await req.json();
        console.log("Request data:", res); // Log the request data for debugging

        const emailData = {
            from: 'DocEasy@resend.dev',
            to: [res.email],
            subject: 'Appointment Booking Confirmation',
            react: Email({ userFirstname: res.name }), // Ensure correct data is passed
        };

        const data = await resend.emails.send(emailData);
        console.log("Email send response:", data); // Log the response for debugging

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error sending email:", error); // Log the error for debugging
        return NextResponse.json({ error: error.message });
    }
}
