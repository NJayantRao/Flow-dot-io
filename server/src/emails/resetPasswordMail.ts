import { mailGenerator } from "../lib/mailgen.js";

export const generateResetPasswordEmail = (username: string, otp: number) => {
  const email = {
    body: {
      name: username,

      intro: [
        "Reset your password 🔐",
        "We received a request to reset your Flow account password.",
        "Use the verification code below to continue:",

        // 🔥 OTP BOX (refined)
        `
        <div style="
          background: linear-gradient(135deg, #EEF2FF, #F5F3FF);
          padding:20px;
          border-radius:12px;
          text-align:center;
          margin:24px 0;
          border:1px solid #E0E7FF;
        ">
          <div style="
            font-size:12px;
            color:#6B7280;
            margin-bottom:8px;
            letter-spacing:0.5px;
          ">
            YOUR VERIFICATION CODE
          </div>
          <div style="
            font-size:26px;
            font-weight:700;
            letter-spacing:6px;
            color:#7C3AED;
          ">
            ${otp}
          </div>
        </div>
        `,

        "This code will expire in 10 minutes.",
      ],

      outro: [
        "If you didn’t request a password reset, you can ignore this email.",
        "For security, never share this code with anyone.",
        "",
        "— Team Flow",
      ],
    },
  };

  return {
    html: mailGenerator.generate(email),
    text: `
Hello ${username},

Reset your password

We received a request to reset your Flow password.

Your verification code: ${otp}
This code is valid for 10 minutes.

If you didn’t request this, you can ignore this email.

— Team Flow
    `,
  };
};
