import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative w-full dark:bg-black bg-zinc-50 font-sans">
      <header>
        <Navbar />
      </header>
      <main className="w-full">
        <HeroSection />
      </main>
    </div>
  );
}
