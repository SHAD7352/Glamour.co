"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/api"; // <-- Use the API helper
import { formatPrice } from "@/lib/utils"; // <-- Use the price formatter
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle
} from "@/components/ui/Card"; // <-- FIX: Changed path to lowercase 'card'
import { Button } from "@/components/ui/Button"; // <-- FIX: Changed path to lowercase 'button'

const ProductCard = ({ p }: { p: Product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col" // Added to ensure footer sticks to bottom
        >
            <Card className="flex-grow flex flex-col">
                <CardContent className="p-0">
                    <div className="relative h-56 md:h-48 lg:h-56 w-full">
                        <Image
                            src={p.image ?? "/images/flower/default.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <CardTitle>{p.name}</CardTitle>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {formatPrice(p.price ?? 0)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                            {p.shortDescription ?? "Hand-crafted for modern spaces."}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="mt-auto p-4 flex gap-3">
                    <Button asChild className="flex-1">
                        <Link href={`/products/${p.id}`}>View</Link>
                    </Button>
                    <Button asChild variant="secondary" className="flex-1">
                        <Link href={`/request?productId=${p.id}`}>Request</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(); // <-- Cleaner fetch
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 md:py-20 lg:py-28 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover our collection of handcrafted flower arrangements.
                    </p>
                </div>

                {loading && (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Loading products...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500 font-semibold">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((p) => (
                            <ProductCard key={p.id} p={p} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

