import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Features from "@/components/sections/Features";
import Brands from "@/components/sections/Brands";
import Video from "@/components/sections/Video";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Features />
      <Video />
      <Brands />
      <Testimonials />
    </>
  );
}
