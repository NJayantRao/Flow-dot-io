import Mailgen from "mailgen";

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Flow.io",
    link: "https://yourdomain.com",
  },
});

export { mailGenerator };
