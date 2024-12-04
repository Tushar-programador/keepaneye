import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (email, websiteName, websiteURL) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Website Down Alert: ${websiteName}`,
      html: `
        <p>Dear User,</p>
        <p>Your website <strong>${websiteName}</strong> (<a href="${websiteURL}" target="_blank">${websiteURL}</a>) is currently <strong>down</strong>.</p>
        <p>Please check and resolve the issue as soon as possible.</p>
        <p>Thank you,</p>
        <p>Your Monitoring Team</p>
      `,
    });
    console.log(`Email sent to ${email} for website: ${websiteName}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
