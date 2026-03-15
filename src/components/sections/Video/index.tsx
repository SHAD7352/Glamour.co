"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../../Common/SectionTitle";
import ReactPlayer from "react-player";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Discover Our Premium Flower Collection"
          paragraph="Experience elegance and freshness with our handpicked selection of premium flowers. From weddings to corporate events, we bring your vision to life with stunning floral arrangements crafted by expert florists."
          center
          mb="80px"
        />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ReactPlayer
              src="https://www.youtube.com/embed/hHw3MNwQIIE"
              playing
              width="100%"
              height="100%"
              controls
            />
            <button
              className="absolute -top-10 right-0 text-3xl text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
