import { Blog } from "@/app/sections/Blog";
import { Contact } from "@/app/sections/Contact";
import { FAQ } from "@/app/sections/FAQ";
import { Features } from "@/app/sections/Features";
import { Footer } from "@/app/sections/Footer";
import { Hero } from "@/app/sections/Hero";
import { Navbar } from "@/app/sections/Navbar";
import { Pricing } from "@/app/sections/Pricing";
import { Stats } from "@/app/sections/Stats";
import { Testimonials } from "@/app/sections/Testimonials";
import { Waitlist } from "@/app/sections/Waitlist";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Waitlist />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
