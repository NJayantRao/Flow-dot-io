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
        "A place where developers learn faster, share smarter, and grow together.",
      ],

      action: {
        instructions:
          "You're one step away from getting started. Activate your account below:",
        button: {
          color: "#2563EB",
          text: "Activate Account",
          link: verifyLink,
        },
      },

      outro: [
        "Here’s what you can do once you're in:",
        "",
        "✨ Ask questions and get clear answers",
        "🚀 Share your knowledge with the community",
        "🏆 Build your reputation as a developer",
        "📌 Create your public dev profile",
        "",
        "If you didn’t sign up for Flow, you can safely ignore this email.",
      ],

      signature: "— Team Flow.io",
    },
  };

  return {
    html: mailGenerator.generate(email),
    text: mailGenerator.generatePlaintext(email),
  };
};
