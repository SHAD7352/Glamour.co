"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Product } from "@/types/product";
import { getProductById } from "@/lib/api";
import { createWhatsAppLinkWithoutNo, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button"; // <-- FIX: Changed path to lowercase 'button'

export default function ProductDetailsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id || searchParams.get("productId");

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError("No product ID specified.");
            return;
        };

        const fetchProduct = async () => {
            try {
                const data = await getProductById(id as string);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Product not found.");
                }
            } catch (err) {
                setError("Failed to load product details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <p className="text-center text-lg py-20 text-gray-500 dark:text-gray-400">
                Loading...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-500 py-20 font-semibold">
                {error}
            </p>
        );
    }

    if (!product) return null;

    const imagesForDemo = [
        product.image ?? "/images/flower/default.jpg",
        "/images/flower/flower-1.jpg",
        "/images/flower/flower-2.jpg",
        "/images/flower/flower-3.jpg",
    ];

    const message = `Hi, I am interested in ${product.name}. Please share more details.`;
    const whatsappLink = createWhatsAppLinkWithoutNo(message);

    return (
        <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-dark rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-12"
                >
                    <div className="w-full h-80 md:h-96 lg:h-auto">
                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            className="w-full h-full"
                        >
                            {imagesForDemo.map((imgSrc, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={imgSrc}
                                            alt={`${product.name} - view ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col">
                        <div className="flex-grow">
                            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                                {product.name}
                            </h1>
                            <p className="text-2xl text-rose-600 font-semibold mb-6">
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg mb-8">
                                {product.shortDescription}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button asChild className="flex-1" size="lg">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Order via WhatsApp
                                </a>
                            </Button>
                            <Button asChild variant="secondary" size="lg" className="flex-1">
                                <Link href="/products">Back to Products</Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

