'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/productService';
import { useState } from 'react';

// Schema
const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Price must be a positive number',
    }),
    coverImage: z.custom<FileList>()
        .refine((files) => files?.length === 1, 'Cover image is required')
        .transform((files) => files[0]),
    images: z.custom<FileList>()
        .optional()
        .transform((files) => files ? Array.from(files) : []),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductUploadForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        // Type casting required due to version mismatch between Zod 4 and Resolvers 5
        resolver: zodResolver(productSchema) as any,
    });

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            // Safe access to the transformed/refined values might differ depending on how RHF handles transformed values.
            // Actually, RHF gives the raw input value usually, but let's assume we handle the "File" objects manually if needed
            // or rely on the fact that `register` pulls from `files` property.
            // The zod transform happens at validation/submit time, so `data.coverImage` should be a File object if valid.

            // Manual casting because typescript might be confused by the transform output type vs input type
            await productService.createProduct({
                name: data.name,
                description: data.description,
                price: Number(data.price),
                coverImage: data.coverImage as unknown as File,
                images: data.images as unknown as File[],
            });
            router.push('/products');
            router.refresh();
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('Failed to create product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-sm bg-white p-8 shadow-two dark:bg-dark-2 sm:p-11 lg:p-8 xl:p-11">
            <h3 className="mb-8 text-2xl font-bold text-dark dark:text-white">
                Upload New Product
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Product Name
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Enter product name"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message as string}</p>}
                </div>

                <div className="mb-8">
                    <label htmlFor="price" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Price
                    </label>
                    <input
                        {...register('price')}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message as string}</p>}
                </div>

                <div className="mb-8">
                    <label htmlFor="description" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        rows={5}
                        placeholder="Describe your product"
                        className="w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message as string}</p>}
                </div>

                <div className="mb-8">
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Cover Image
                    </label>
                    <input
                        {...register('coverImage')}
                        type="file"
                        accept="image/*"
                        className="w-full cursor-pointer rounded-sm border border-stroke bg-[#f8f8f8] text-base text-body-color outline-none file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                    />
                    {errors.coverImage && <p className="mt-1 text-sm text-red-500">{errors.coverImage.message as string}</p>}
                </div>

                <div className="mb-8">
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Additional Images (Optional)
                    </label>
                    <input
                        {...register('images')}
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full cursor-pointer rounded-sm border border-stroke bg-[#f8f8f8] text-base text-body-color outline-none file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-70"
                    >
                        {isSubmitting ? 'Uploading...' : 'Publish Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
