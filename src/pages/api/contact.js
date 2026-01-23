// API endpoint for contact form submission
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, number, category, message } = req.body;

    // Validate required fields
    if (!name || !email || !number || !category || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'vignesh16v@gmail.com',
        pass: process.env.SMTP_PASS // Your Gmail app password
      }
    });

    // Email template for customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2563eb; margin-bottom: 10px;">Thank You for Contacting Shopy</h2>
          <p style="color: #6b7280; font-size: 16px;">We appreciate your interest in our services</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
            Dear <strong>${name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
            Thank you for reaching out to us. We have received your message and our team will get back to you within 24 hours.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
            Here's a summary of your inquiry:
          </p>
          <ul style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0 0 20px 20px;">
            <li><strong>Category:</strong> ${category}</li>
            <li><strong>Message:</strong> ${message}</li>
            <li><strong>Contact Number:</strong> ${number}</li>
          </ul>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
            If you have any urgent questions, please don't hesitate to call us at <a href="tel:+917010744553" style="color: #2563eb; text-decoration: none;">+91 70107 44553</a> or email us at <a href="mailto:levi16v@outlook.com" style="color: #2563eb; text-decoration: none;">levi16v@outlook.com</a>.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">Best regards,</p>
          <p style="color: #374151; font-size: 16px; font-weight: 600; margin: 0;">The Shopy Team</p>
          <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
            <a href="https://shopy.com" style="color: #2563eb; text-decoration: none;">www.shopy.com</a>
          </p>
        </div>
      </div>
    `;

    // Send email to customer
    const customerMailOptions = {
      from: process.env.FROM_EMAIL || 'vignesh16v@gmail.com',
      to: email,
      subject: 'Thank you for contacting Shopy',
      html: customerEmailHtml,
      text: `Thank you for contacting Shopy\n\nDear ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you within 24 hours.\n\nCategory: ${category}\nMessage: ${message}\nContact Number: ${number}\n\nIf you have any urgent questions, please don't hesitate to call us at +91 70107 44553 or email us at levi16v@outlook.com.\n\nBest regards,\nThe Shopy Team`
    };

    // Email template for admin notification
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${number}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #fff; padding: 10px; border-radius: 4px;">${message}</p>
        </div>
      </div>
    `;

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.FROM_EMAIL || 'vignesh16v@gmail.com',
      to: 'levi16v@outlook.com',
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailHtml,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${number}\nCategory: ${category}\nMessage: ${message}`
    };

    // Send both emails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
