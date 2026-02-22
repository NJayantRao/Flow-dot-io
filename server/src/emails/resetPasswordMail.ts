import {mailGenerator} from "../lib/mailgen.js";

export const generateResetPasswordEmail = (username: string, otp: number) => {
  const email = {
    body: {
      name: username,

      intro: [
        "We received a request to reset your Flow account password.",
        "Use the One-Time Password (OTP) below to continue.",

        // OTP BOX
        `
        <div style="
          background-color:#F0F4FB;
          padding:16px;
          border-radius:8px;
          text-align:center;
          margin:20px 0;
        ">
          <span style="
            font-size:22px;
            font-weight:700;
            letter-spacing:4px;
            color:#2563EB;
          ">
            ${otp}
          </span>
        </div>
        `,

        "This OTP is valid for 10 minutes.",
      ],

      outro: [
        "If you did not request a password reset, you can safely ignore this email.",
        "For security reasons, never share this OTP with anyone.",
        "",
        "Stay secure,",
        "Team Flow",
      ],
    },
  };

  return {
    html: mailGenerator.generate(email),
    text: `
Hello ${username},

We received a request to reset your Flow password.

Your OTP: ${otp}
Valid for 10 minutes.

If you did not request this, ignore this email.

Team Flow
    `,
  };
};
