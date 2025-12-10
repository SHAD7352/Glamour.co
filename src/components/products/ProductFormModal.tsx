'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Trash2 } from 'lucide-react';
import { Product } from '@/types/domain/product';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const productSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(500, 'Description is too long'),
    price: z.number().min(0.01, 'Price must be greater than 0'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
    mode: 'create' | 'edit';
}

export default function ProductFormModal({
    isOpen,
    onClose,
    product,
    mode,
}: ProductFormModalProps) {
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [additionalImagesFiles, setAdditionalImagesFiles] = useState<File[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // Track image URLs to delete

    // Cloudflare R2 public domain
    const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || 'https://pub-ff7d91c76708455393e73ce049051059.r2.dev';

    const getImageUrl = (path?: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${R2_PUBLIC_DOMAIN}/${path}`;
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
        },
    });

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    // Reset form when modal opens/closes or product changes
    useEffect(() => {
        if (isOpen) {
            reset({
                name: product?.name || '',
                description: product?.description || '',
                price: product?.price || 0,
            });
            setCoverImageFile(null);
            setAdditionalImagesFiles([]);
            setImagesToDelete([]); // Reset delete list
        }
    }, [isOpen, product, reset]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const onSubmit = (data: ProductFormData) => {
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('Price', data.price.toString());

        if (coverImageFile) {
            formData.append('CoverImage', coverImageFile);
        }

        additionalImagesFiles.forEach((file) => {
            formData.append('Images', file);
        });

        // Add images to delete (if in edit mode)
        if (mode === 'edit' && imagesToDelete.length > 0) {
            imagesToDelete.forEach((imageUrl) => {
                formData.append('ImagesToDelete', imageUrl);
            });
        }

        if (mode === 'create') {
            createMutation.mutate(formData, {
                onSuccess: () => {
                    onClose();
                    reset();
                },
                onError: (error: any) => {
                    setError('root', {
                        message: error.message || 'Failed to create product',
                    });
                },
            });
        } else {
            updateMutation.mutate(
                { id: product!.id, formData },
                {
                    onSuccess: () => {
                        onClose();
                        reset();
                    },
                    onError: (error: any) => {
                        setError('root', {
                            message: error.message || 'Failed to update product',
                        });
                    },
                }
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-dark-2"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stroke bg-white px-6 py-4 dark:border-gray-700 dark:bg-dark-2">
                    <h2 className="text-2xl font-bold text-dark dark:text-white">
                        {mode === 'create' ? 'Add New Product' : 'Edit Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-body-color transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        type="button"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            Product Name *
                        </label>
                        <Input id="name" type="text" {...register('name')} />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            {...register('description')}
                            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:text-white dark:focus:border-primary"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            Price *
                        </label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register('price', { valueAsNumber: true })}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label htmlFor="coverImage" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            Cover Image {mode === 'create' ? '*' : '(optional)'}
                        </label>

                        {/* Show current cover image in edit mode */}
                        {mode === 'edit' && product?.coverImageUrl && (
                            <div className="mb-3 rounded-lg border border-stroke p-3 dark:border-gray-700">
                                <p className="mb-2 text-xs font-medium text-body-color">Current Cover Image:</p>
                                <img
                                    src={getImageUrl(product.coverImageUrl)!}
                                    alt="Current cover"
                                    className="h-32 w-full rounded-md object-cover"
                                />
                            </div>
                        )}

                        <input
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90 dark:border-gray-700 dark:text-white"
                        />
                        {mode === 'edit' && (
                            <p className="mt-1 text-xs text-body-color">
                                Upload a new image to replace the current cover image, or leave empty to keep it
                            </p>
                        )}
                    </div>

                    {/* Additional Images */}
                    <div>
                        <label htmlFor="images" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            Additional Images (optional)
                        </label>

                        {/* Show current additional images in edit mode */}
                        {mode === 'edit' && product?.imageUrls && product.imageUrls.length > 0 && (
                            <div className="mb-3 rounded-lg border border-stroke p-3 dark:border-gray-700">
                                <p className="mb-2 text-xs font-medium text-body-color">
                                    Current Additional Images ({product.imageUrls.length - imagesToDelete.length} of {product.imageUrls.length}):
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {product.imageUrls.map((url, index) => {
                                        const isMarkedForDelete = imagesToDelete.includes(url);
                                        return (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={getImageUrl(url)!}
                                                    alt={`Additional image ${index + 1}`}
                                                    className={`h-24 w-full rounded-md object-cover transition-opacity ${isMarkedForDelete ? 'opacity-30' : 'opacity-100'
                                                        }`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (isMarkedForDelete) {
                                                            // Unmark for deletion
                                                            setImagesToDelete(imagesToDelete.filter(img => img !== url));
                                                        } else {
                                                            // Mark for deletion
                                                            setImagesToDelete([...imagesToDelete, url]);
                                                        }
                                                    }}
                                                    className={`absolute right-1 top-1 rounded-full p-1.5 shadow-lg transition-all ${isMarkedForDelete
                                                            ? 'bg-gray-500 hover:bg-gray-600'
                                                            : 'bg-red-500 hover:bg-red-600'
                                                        } text-white`}
                                                    title={isMarkedForDelete ? 'Undo delete' : 'Mark for deletion'}
                                                >
                                                    {isMarkedForDelete ? (
                                                        <X size={14} />
                                                    ) : (
                                                        <Trash2 size={14} />
                                                    )}
                                                </button>
                                                {isMarkedForDelete && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">Will Delete</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {imagesToDelete.length > 0 && (
                                    <p className="mt-2 text-xs font-medium text-red-500">
                                        {imagesToDelete.length} image{imagesToDelete.length > 1 ? 's' : ''} marked for deletion
                                    </p>
                                )}
                            </div>
                        )}

                        <input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setAdditionalImagesFiles(Array.from(e.target.files || []))}
                            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm font-semibold file:text-white hover:file:bg-primary/90 dark:border-gray-700 dark:text-white"
                        />
                        {mode === 'edit' && (
                            <p className="mt-1 text-xs text-body-color">
                                Upload new images to add to the product, or leave empty to keep existing images
                            </p>
                        )}
                    </div>

                    {/* Error Message */}
                    {errors.root && (
                        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/10">
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.root.message}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                            className="flex-1"
                        >
                            {isSubmitting || createMutation.isPending || updateMutation.isPending
                                ? mode === 'create'
                                    ? 'Creating...'
                                    : 'Updating...'
                                : mode === 'create'
                                    ? 'Create Product'
                                    : 'Update Product'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
