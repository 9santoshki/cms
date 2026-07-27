import React from 'react';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/db/products';
import ProductDetailPageClient from './ProductDetailPageClient';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ProductDetailPageProps,
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.',
      };
    }

    const title = product.name;
    const description = product.description
      ? product.description.replace(/<[^>]*>/g, '').slice(0, 160)
      : 'Premium interior design product from Colour My Space.';
    const imageUrl = product.image_url || '/og-image.png';
    const productUrl = `/products/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        title,
        description,
        url: productUrl,
        type: 'website',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    // DB error — fall back to layout defaults
    return {};
  }
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const resolvedParams = await params;
  return <ProductDetailPageClient params={resolvedParams} />;
};

export default ProductDetailPage;
