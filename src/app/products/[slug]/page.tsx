import React from 'react';
import ProductDetailPageClient from './ProductDetailPageClient';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const resolvedParams = await params;
  return <ProductDetailPageClient params={resolvedParams} />;
};

export default ProductDetailPage;