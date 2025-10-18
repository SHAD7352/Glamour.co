"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// FIX 1: Only import 'Modal' from the ui component
import { Modal } from "@/components/ui/Modal";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";

interface ProductViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductViewModal({ product, isOpen, onClose }: ProductViewModalProps) {
    if (!product) {
        return null;
    }

    const imagesForDemo = [
        product.image ?? "/images/flower/default.jpg",
        "/images/flower/flower-1.jpg",
        "/images/flower/flower-2.jpg",
        "/images/flower/flower-3.jpg",
    ];

    return (
        // FIX 2: Pass the 'title' prop here.
        // The Modal component will now create the header and title for you.
        <Modal isOpen={isOpen} onClose={onClose} title={product.name}>

            {/* This content is passed as 'children' to the Modal.
        The Modal will render it below its own header.
      */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Image Gallery */}
                <div className="w-full h-80 md:h-96">
                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-full rounded-lg"
                    >
                        {imagesForDemo.map((imgSrc, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={imgSrc}
                                        alt={`${product.name} - view ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="flex-grow">
                        <p className="text-2xl text-rose-600 font-semibold mb-4">
                            {formatPrice(product.price)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            {product.shortDescription}
                        </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button asChild size="lg" className="w-full">
                            <Link href={`/products/${product.id}`}>View Full Details</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}