import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];
  try {
    await mailtrapClient.send({

      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Integration Test",
    });
    console.log("Email sent successfully")
  } catch (error) {
    console.error("Can't send verification email");
    throw new Error("Error sending verification email" + error)
  }
}