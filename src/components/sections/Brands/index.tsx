import { Brand } from "@/types/domain/brand";
import Image from "next/image";
import { brandsData } from "@/data";

const Brands = () => {
  return (
    <section className="pt-16 pb-16 md:pb-20 lg:pb-28 bg-white dark:bg-bg-color-dark" id="events">
      <div className="container">
        <div className="mb-[60px] text-center max-w-[600px] mx-auto wow fadeInUp" data-wow-delay=".1s">
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl">
            Event Collections
          </h2>
          <p className="text-base text-body-color dark:text-body-color-dark">
            Elegantly crafted floral experiences for your most memorable moments.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 wow fadeInUp" data-wow-delay=".2s">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="group w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px]">
      <a
        href={href}
        className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-brand transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-dark border border-transparent hover:border-primary/20"
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0"></div>
      </a>
    </div>
  );
};
