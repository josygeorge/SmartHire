// utils/sendResetEmail.ts
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // Ensure env is loaded in this file

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Password Reset - SmartHire',
      html: `
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link is valid for 1 hour.</p>
    `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email sending failed');
  }
};
