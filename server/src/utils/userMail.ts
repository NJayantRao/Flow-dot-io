import {generateRegistrationEmail} from "../emails/registerUserMail.js";
import {resend} from "../lib/resend.js";

export const sendRegistrationEmail = async (
  email: string,
  username: string,
  verifyLink: string
) => {
  const {html, text} = generateRegistrationEmail(username, verifyLink);
  const info = await resend.emails.send({
    from: "Flow <onboarding@nagriksetu.site>",
    to: email,
    subject: "Welcome to Flow!",
    text: text,
    html: html,
  });

  // console.log(info);
};
