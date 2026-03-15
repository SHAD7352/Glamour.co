import SectionTitle from "../../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { featuresData } from "@/data";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Why Choose Our Flower Shop"
            paragraph="We provide premium quality flowers, expert floral design, same-day delivery, and exceptional customer service. Every arrangement is crafted with love and attention to detail for your special moments."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
