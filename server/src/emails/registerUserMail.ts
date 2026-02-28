import { mailGenerator } from "../lib/mailgen.js";

export const generateRegistrationEmail = (
  username: string,
  verifyLink: string
) => {
  const email = {
    body: {
      name: username,

      intro: [
        "Welcome to Flow 👋",
        "You’re now part of a developer community where questions get answered and knowledge moves forward.",
        "Let’s activate your account and get you started.",
      ],

      action: {
        instructions: "Click below to activate your account:",
        button: {
          color: "#F48024",
          text: "Activate My Account",
          link: verifyLink,
        },
      },

      outro: [
        "Once activated, you can:",
        "• Ask technical questions\n• Share answers\n• Earn reputation\n• Build your developer profile",
        "",
        "If you didn’t create a Flow account, you can safely ignore this email.",
      ],
    },
  };

  return {
    html: mailGenerator.generate(email),
    text: mailGenerator.generatePlaintext(email),
  };
};
