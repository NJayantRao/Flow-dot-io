import {generateRegistrationEmail} from "../emails/registerUserMail.js";
import {generateResetPasswordEmail} from "../emails/resetPasswordMail.js";
import {resend} from "../lib/resend.js";

export const sendRegistrationEmail = async (
  email: string,
  username: string,
  verifyLink: string
) => {
  try {
    const {html, text} = generateRegistrationEmail(username, verifyLink);
    const info = await resend.emails.send({
      from: "Flow <onboarding@nagriksetu.site>",
      to: email,
      subject: "Welcome to Flow!",
      text: text,
      html: html,
    });

    // console.log(info);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
};

export const sendResetPasswordMail = async (
  email: string,
  username: string,
  otp: number
) => {
  const {html, text} = generateResetPasswordEmail(username, otp);
  const info = await resend.emails.send({
    from: "Flow <support@nagriksetu.site>",
    to: email,
    subject: "Your Flow Password Reset OTP",
    text: text,
    html: html,
  });

  // console.log(info);
};
