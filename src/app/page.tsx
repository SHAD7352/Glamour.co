import AboutSectionOne from "@/components/sections/About/AboutSectionOne";
import AboutSectionTwo from "@/components/sections/About/AboutSectionTwo";
import Blog from "@/components/sections/Blog";
import Brands from "@/components/sections/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/features/contact";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import Video from "@/components/sections/Video";
import { Metadata } from "next";
import SigninPage from "./signin/page";

export const metadata: Metadata = {
  title: "Glamour Flowers - Handmade Flowers & Beautiful Bouquets",
  description:
    "Discover our collection of handcrafted flowers and stunning bouquets. Fresh blooms, expert florists, and same-day delivery for every special occasion.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
