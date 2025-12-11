'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'Bouquets',
        description: 'Handmade flower bouquets for every occasion',
        image: '/images/categories/bouquet.jpg',
        href: '/products?category=bouquet',
        color: 'from-pink-500 to-rose-600',
    },
    {
        id: 2,
        name: 'Hampers',
        description: 'Curated gift hampers filled with love',
        image: '/images/categories/hamper.jpg',
        href: '/products?category=hamper',
        color: 'from-purple-500 to-indigo-600',
    },
    {
        id: 3,
        name: 'Accessories',
        description: 'Beautiful accessories to complement your gifts',
        image: '/images/categories/accessories.jpg',
        href: '/products?category=accessories',
        color: 'from-amber-500 to-orange-600',
    },
];

export default function Categories() {
    return (
        <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                        Shop by Category
                    </h2>
                    <p className="text-base text-body-color md:text-lg">
                        Explore our curated collection of handmade products
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={category.href}
                                className="group relative block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-dark-2"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    {/* Placeholder gradient if no image */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`} />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                                    {/* Category Name Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <h3 className="mb-3 text-3xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                                            {category.name}
                                        </h3>
                                        <p className="mb-4 text-sm text-white/90 transition-all duration-300 group-hover:text-white">
                                            {category.description}
                                        </p>

                                        {/* View More Button */}
                                        <div className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105">
                                            <span>Explore</span>
                                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>

                                    {/* Decorative Element */}
                                    <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${category.color} opacity-30 blur-3xl transition-all duration-500 group-hover:scale-150`} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
                    >
                        View All Products
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
