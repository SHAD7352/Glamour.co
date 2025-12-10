import ProductUploadForm from '@/components/products/ProductUploadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upload Product | Glamour',
    description: 'Upload a new product to the Glamour catalog',
};

export default function UploadProductPage() {
    return (
        <section className="bg-gray-light py-16 pt-24 dark:bg-bg-color-dark md:pt-32">
            <div className="container">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                        <ProductUploadForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
