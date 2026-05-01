import { mailGenerator } from "../lib/mailgen.js";

export const generateResetPasswordEmail = (username: string, otp: number) => {
  const email = {
    body: {
      name: username,

      intro: [
        "Reset your password 🔐",
        "We received a request to reset your Flow account password.",
        "Use the verification code below to continue:",

        // ✅ OTP box (clean + structured)
        `
        <div style="
          background-color:#F0F4FB;
          padding:18px;
          border-radius:10px;
          text-align:center;
          margin:22px 0;
        ">
          <div style="
            font-size:13px;
            color:#6B7280;
            margin-bottom:6px;
          ">
            YOUR VERIFICATION CODE
          </div>

          <div style="
            font-size:24px;
            font-weight:700;
            letter-spacing:5px;
            color:#2563EB;
          ">
            ${otp}
          </div>
        </div>
        `,

        "This code is valid for 10 minutes.",
      ],

      outro: [
        "If you didn’t request a password reset, you can ignore this email.",
        "Your account will remain secure.",
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
Valid for 10 minutes.

If you didn’t request this, you can ignore this email.

— Team Flow
    `,
  };
};
