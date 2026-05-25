import { Features } from "@/app/sections/Features";
import { Footer } from "@/app/sections/Footer";
import { Hero } from "@/app/sections/Hero";
import { Navbar } from "@/app/sections/Navbar";
import { Pricing } from "@/app/sections/Pricing";
import { Waitlist } from "@/app/sections/Waitlist";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
