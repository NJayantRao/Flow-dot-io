"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { IconCloud } from "./icon-cloud";
import { HoverBorderGradient } from "./hover-border-gradient";

export const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="min-h-screen sm:h-[300vh] py-10 sm:py-28 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Extra top padding on mobile for the sticky top bar */}
      <div className="sm:hidden h-14" aria-hidden="true" />
      <Header />

      {/* Desktop-only parallax rows */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="hidden sm:block"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile-only: static featured cards instead of parallax */}
      <div className="sm:hidden px-4 mt-8 grid grid-cols-2 gap-3">
        {products.slice(0, 6).map((product) => (
          <a
            key={product.title}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-2xl overflow-hidden group ghost-border"
            style={{ aspectRatio: "16/10" }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(14,14,20,0.85) 0%, rgba(14,14,20,0) 60%)",
              }}
            />
            <span className="absolute bottom-2 left-3 text-[11px] font-medium text-[#e8ecf0] opacity-90">
              {product.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto px-4 sm:px-6 w-full flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-12">
        {/* Left: Text */}
        <div className="px-2 sm:px-4 z-20 max-w-xl w-full text-center md:text-left">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 md:mb-0"
            style={{
              background: "rgba(129,236,255,0.08)",
              border: "1px solid rgba(129,236,255,0.2)",
              color: "#81ecff",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#81ecff] animate-pulse inline-block" />
            College coding community
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold dark:text-white mt-4">
            Flow<span className="gradient-text">.io</span>
          </h1>
          <p className="max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-xl mt-4 md:mt-8 dark:text-neutral-400 leading-relaxed">
            Ask Questions, Share knowledge and Collaborate with Developers.
            <br className="hidden sm:block" />
            Join our Community and Enhance your Coding Skills.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-6 md:mt-8">
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>Ask Questions</span>
            </HoverBorderGradient>
            <a
              href="/get-questions"
              className="flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: "rgba(129,236,255,0.08)",
                border: "1px solid rgba(129,236,255,0.18)",
                color: "#e8ecf0",
              }}
            >
              Browse Questions
            </a>
          </div>

          {/* Mobile: stats row */}
          <div className="flex items-center justify-center md:justify-start gap-6 mt-8 md:hidden">
            {[
              { label: "Questions", value: "2.4k+" },
              { label: "Developers", value: "800+" },
              { label: "Answers", value: "9.1k+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#4d5668] font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Icon Cloud — hidden on small mobile, shown from md */}
        <div className="hidden sm:flex items-center justify-center md:justify-end flex-shrink-0">
          <div className="relative flex items-center justify-center overflow-hidden w-[280px] sm:w-[340px] md:w-[420px]">
            <IconCloud images={images} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
