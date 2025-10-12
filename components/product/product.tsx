"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Static product data
const staticProducts = [
    {
        id: 1,
        name: "Classic Rose Bouquet",
        price: 49.99,
        shortDescription:
            "A timeless arrangement of a dozen red roses, perfect for any occasion.",
        image: "/images/flower/flower-1.jpg",
    },
    {
        id: 2,
        name: "Sunny Day Lilies",
        price: 39.5,
        shortDescription:
            "Brighten someone's day with these vibrant and fragrant lilies.",
        image: "/images/flower/flower-2.jpg",
    },
    {
        id: 3,
        name: "Elegant Orchid Plant",
        price: 75.0,
        shortDescription:
            "A sophisticated and long-lasting orchid for modern spaces.",
        image: "/images/flower/flower-3.jpg",
    },
];

const ProductCard = ({ p }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-dark rounded-2xl shadow-md overflow-hidden flex flex-col transition-colors duration-300"
        >
            {/* Image */}
            <div className="relative h-56 md:h-48 lg:h-56 w-full">
                <Image
                    src={p.image ?? "/images/flower/default.jpg"}
                    alt={p.name}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {p.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${(p.price ?? 0).toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 flex-1">
                    {p.shortDescription ?? "Hand-crafted for modern spaces."}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                    <Link
                        href={`/products/${p.id}`}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-center py-2 rounded-full text-sm font-medium transition-colors"
                    >
                        View
                    </Link>
                    <Link
                        href={`/request?productId=${p.id}`}
                        className="flex-1 border-2 border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-gray-800 text-center py-2 rounded-full text-sm font-medium transition"
                    >
                        Request
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default function Products() {
    const products = staticProducts;

    return (
        <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 md:py-20 lg:py-28 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover our collection of handcrafted flower arrangements.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((p) => (
                        <ProductCard key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
