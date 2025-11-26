'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { apiClient } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailDisplay from '@/components/ProductDetailDisplay';

interface ProductDetailPageClientProps {
  params: {
    slug: string;
  };
}

const ProductDetailPageClient = (props: ProductDetailPageClientProps) => {
  const { slug } = props.params || {};
  const { products, loading: contextLoading, error: contextError, fetchProducts } = useAppContext();
  const [product, setProduct] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // Helper function to map category to image class
  const mapCategoryToClass = (category: string | undefined) => {
    if (!category) return 'modern';

    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('modern') || lowerCategory.includes('sofa') || lowerCategory.includes('coffee')) {
      return 'modern';
    } else if (lowerCategory.includes('classic') || lowerCategory.includes('dining')) {
      return 'classic';
    } else if (lowerCategory.includes('coastal') || lowerCategory.includes('bed')) {
      return 'coastal';
    } else if (lowerCategory.includes('office') || lowerCategory.includes('desk')) {
      return 'office';
    } else if (lowerCategory.includes('hotel') || lowerCategory.includes('lobby')) {
      return 'hotel';
    } else if (lowerCategory.includes('restaurant')) {
      return 'restaurant';
    } else {
      return 'modern'; // default
    }
  };

  // Fetch product on mount and when slug changes
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoadingProduct(true);
      setProductError(null);

      try {
        // Check if the parameter is a numeric ID or a slug
        const isNumericId = /^\d+$/.test(slug);
        let result;

        if (isNumericId) {
          // Parameter is a numeric ID
          result = await apiClient.getProduct(parseInt(slug, 10));
        } else {
          // Parameter is a slug - need to make different API call
          result = await apiClient.getProductBySlug(slug);
        }

        if (result.success && result.data) {
          // Convert price string to number if necessary and add imageClass based on category
          const formattedProduct = {
            ...result.data,
            price: typeof result.data.price === 'string'
              ? parseFloat(result.data.price)
              : result.data.price,
            imageClass: mapCategoryToClass(result.data.category) || 'modern',
            image_url: result.data.image_url
          };
          setProduct(formattedProduct);
        } else {
          const error = result.error || 'Product not found';
          setProductError(error);
        }
      } catch (err: any) {
        const errorMsg = err.message || 'Failed to load product';
        setProductError(errorMsg);
      } finally {
        setLoadingProduct(false);
      }
    };

    // Fetch product from API
    fetchProduct();
  }, [slug]);

  // If products haven't been loaded at all, fetch them
  useEffect(() => {
    if (products.length === 0 && !contextLoading?.products) {
      fetchProducts();
    }
  }, [products.length, fetchProducts, contextLoading?.products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white product-detail-page">
      <Header activePage="products" />
      {productError ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-gray-100">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Item Not Available</h2>
            <p className="mt-2 text-gray-600">{productError}</p>
            <button
              className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
              onClick={() => {
                window.location.href = '/products';
              }}
            >
              Browse Collection
            </button>
          </div>
        </div>
      ) : product ? (
        <div className="container mx-auto px-4 py-8">
          <ProductDetailDisplay product={product} />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPageClient;