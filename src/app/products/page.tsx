'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import ProductCard from '@/components/products/ProductCard';
import ProductFormModal from '@/components/products/ProductFormModal';
import Cart from '@/components/cart/Cart';
import CartButton from '@/components/cart/CartButton';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { Product } from '@/types/domain/product';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    },
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
        default:
          return b.id - a.id; // Assuming higher ID means newer
      }
    });

    return filtered;
  }, [products, searchQuery, sortBy, priceRange]);

  const handleDelete = (productId: number) => {
    console.log('Products page handleDelete called with ID:', productId);
    console.log('Calling deleteMutation.mutate...');
    deleteMutation.mutate(productId);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <>
      <section className="bg-gray-light py-16 pt-24 dark:bg-bg-color-dark md:pt-32">
        <div className="container">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="w-full text-center md:text-left">
              <h1 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold !leading-tight text-transparent sm:text-4xl md:text-[45px]">
                Our Exclusive Collection
              </h1>
              <p className="text-base text-body-color md:text-lg">
                Discover premium products curated just for you
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              + Upload Product
            </button>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md dark:bg-dark-2 lg:flex-row lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body-color" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-gray-50 py-3 pl-12 pr-4 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-dark dark:text-white"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-body-color" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-stroke bg-gray-50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-dark dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 rounded-lg border border-stroke p-1 dark:border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-2 transition-colors ${viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-body-color hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                title="Grid view"
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-2 transition-colors ${viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-body-color hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                title="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && !error && (
            <div className="mb-6 text-sm text-body-color">
              Showing <span className="font-semibold text-dark dark:text-white">{filteredAndSortedProducts.length}</span> of{' '}
              <span className="font-semibold text-dark dark:text-white">{products?.length || 0}</span> products
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex h-64 items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-2xl bg-gradient-to-r from-red-50 to-red-100 p-8 text-center dark:from-red-900/10 dark:to-red-800/10">
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                Error loading products. Please try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredAndSortedProducts.length === 0 && (
            <div className="rounded-2xl bg-white p-20 text-center shadow-md dark:bg-dark-2">
              <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
                {searchQuery ? 'No products found' : 'No products yet'}
              </h3>
              <p className="text-body-color">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Start by uploading your first product!'}
              </p>
            </div>
          )}

          {/* Products Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'flex flex-col gap-6'
            }
          >
            {filteredAndSortedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showAdminActions={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <CartButton onClick={() => setIsCartOpen(true)} />

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        mode={modalMode}
      />
    </>
  );
}
