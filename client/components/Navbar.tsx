import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { HomeIcon, MessageCircle, User2 } from "lucide-react";

const Navbar: React.FC = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <User2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <MessageCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <>
      <FloatingNav navItems={navItems} />
    </>
  );
};

export default Navbar;
