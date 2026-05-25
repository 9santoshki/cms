'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCartStore } from '@/store/cartStore';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { Product, Review, ProductVariant } from '@/types';
import VariantSelector from '@/components/VariantSelector';
import { parsePrice, getDiscountPercentage } from '@/lib/utils';
import {
  ProductDetailContainer,
  ProductDetailContent,
  ProductDetailImage,
  ProductDetailInfo,
  ProductDetailTitle,
  ProductDetailPrice,
  ProductDetailDescription,
  ProductDetailActions,
  ErrorMessage
} from '@/components/ProductDetailStyles';

// Styled components
import styled from 'styled-components';

// Breadcrumb navigation
const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #d97706;
  }
`;

const BreadcrumbSeparator = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0 0.25rem;
`;

const BreadcrumbCurrent = styled.span`
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
`;

// Additional styled components that don't conflict with ProductDetailStyles
const ProductImageContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f3f4f6;
`;

const ShippingBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #d97706;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 1rem;
  background-color: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
`;

const OriginalPriceText = styled.span`
  font-size: 1.25rem;
  color: #9ca3af;
  text-decoration: line-through;
  margin-left: 0.75rem;
`;

const DiscountPercentage = styled.span`
  font-size: 0.875rem;
  color: #e74c3c;
  font-weight: 600;
  margin-left: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #fef2f2;
  border-radius: 4px;
`;

// Review form components - compact
const ReviewForm = styled.form`
  background-color: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ReviewFormTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const StarRatingInput = styled.div`
  display: flex;
  gap: 0.125rem;
  margin-bottom: 0.5rem;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${props => props.$filled ? '#f59e0b' : '#d1d5db'};
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: #f59e0b;
  }
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.8rem;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.1);
  }
`;

const SubmitReviewButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, #d97706, #b45309);
  color: white;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(90deg, #b45309, #92400e);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ReviewStatusBadge = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${props =>
    props.$status === 'approved' ? '#dcfce7' :
    props.$status === 'rejected' ? '#fee2e2' : '#fef3c7'};
  color: ${props =>
    props.$status === 'approved' ? '#166534' :
    props.$status === 'rejected' ? '#991b1b' : '#92400e'};
`;

// Category tag
const ProductCategoryTag = styled.span`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: #FFFAEB;
  color: #92400E;
  display: inline-block;
  letter-spacing: 1px;
`;

// Rating section
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ReviewsCount = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Separator = styled.span`
  color: #d1d5db;
`;

// Quantity selector
const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 3rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
`;

// Action buttons
const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 0.625rem 0.75rem;
  background: linear-gradient(90deg, #d97706, #b45309);
  color: white;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;

  &:hover {
    background: linear-gradient(90deg, #b45309, #92400e);
    transform: translateY(-1px);
    box-shadow: 0 6px 12px -3px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`;

const WishlistButton = styled.button`
  padding: 0.625rem 0.75rem;
  border: 2px solid #d1d5db;
  color: #6b7280;
  font-size: 1rem;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;

  &:hover {
    border-color: #f59e0b;
    color: #d97706;
    background-color: #fffbeb;
  }
`;

// Trust badges
const TrustBadges = styled.div`
  display: flex;
  gap: 0;
  padding: 0.5rem 0;
  margin-top: 0;
  border-top: 1px solid #e5e7eb;
`;

const TrustBadgeItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0 0.5rem;
  border-right: 1px solid #e5e7eb;

  &:last-child {
    border-right: none;
  }
`;

const TrustBadgeIcon = styled.div`
  font-size: 1rem;
  color: #d97706;
  flex-shrink: 0;
`;

const TrustBadgeText = styled.p`
  font-size: 0.7rem;
  color: #6b7280;
  line-height: 1.3;
`;

// Thumbnail gallery
const ThumbnailGallery = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const ThumbnailButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
  overflow: hidden;
  border: ${props => props.active ? '2px solid #f59e0b' : '2px solid #e5e7eb'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #f59e0b;
  }
`;

// Description and specs section
const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const DescriptionText = styled.p`
  color: #4b5563;
  line-height: 1.75;
  margin-bottom: 1.5rem;
`;

const SpecificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SpecificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
`;

const SpecificationLabel = styled.span`
  color: #6b7280;
`;

const SpecificationValue = styled.span`
  font-weight: 500;
  color: #1f2937;
`;

// Reviews section - compact
const ReviewsSection = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ReviewStarsContainer = styled.div`
  display: flex;
  margin-right: 0.25rem;
`;

const ReviewItem = styled.div`
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ReviewName = styled.h4`
  font-weight: 500;
  color: #1f2937;
  font-size: 0.875rem;
`;

const ReviewDate = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const ReviewStarsSmall = styled.div`
  display: flex;
  margin: 0.25rem 0;
`;

const ReviewComment = styled.p`
  color: #4b5563;
`;

const SeeAllReviewsButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #fffbeb, #fef3c7);
  border: 1px solid #fbbf24;
  color: #92400e;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;

  &:hover {
    background: linear-gradient(90deg, #fef3c7, #fcd34d);
  }
`;

// Related products section
const RelatedProductsSection = styled.div`
  padding: 2rem;
  padding-bottom: 3rem;
`;

const RelatedProductsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RelatedProductCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

const RelatedProductImageContainer = styled.div`
  height: 12rem;
  position: relative;
`;

const WishlistIcon = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.3s;
  border: none;

  &:hover {
    color: #d97706;
  }
`;

const RelatedProductInfo = styled.div`
  padding: 1rem;
`;

const RelatedProductName = styled.h4`
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const RelatedProductStars = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

// Collapsible Section styled components (for product info sidebar)
const CollapsibleSection = styled.div`
  margin-top: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const CollapsibleHeader = styled.button`
  width: 100%;
  padding: 0.625rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #1f2937;
  transition: background-color 0.2s;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
  padding: ${props => props.$isOpen ? '0.75rem' : '0 0.75rem'};
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: white;
  color: #4b5563;
  line-height: 1.5;
  font-size: 0.8rem;
`;

const CollapsibleChevron = styled.span<{ $isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: 0.65rem;
  color: #6b7280;
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const HighlightIcon = styled.span`
  color: #d97706;
  font-size: 0.75rem;
`;

const HighlightText = styled.span`
  color: #374151;
  font-size: 0.8rem;
`;

// FAQ Section styled components
const FAQSection = styled.div`
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
  background-color: #fafafa;
`;

const FAQSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const FAQItemContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  background-color: white;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #1f2937;
  transition: background-color 0.2s;
  font-size: 0.95rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  padding: ${props => props.$isOpen ? '1rem 1.25rem' : '0 1.25rem'};
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: white;
  color: #4b5563;
  line-height: 1.6;
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: 0.75rem;
`;

// Return Policy Section styled components
const ReturnPolicySection = styled.div`
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
  background-color: #fffbeb;
`;

const ReturnPolicyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const ReturnPolicyCard = styled.div`
  background-color: white;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 1.5rem;
`;

const ReturnPolicyRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const ReturnPolicyIcon = styled.span`
  color: #d97706;
  font-size: 1.25rem;
`;

const ReturnPolicyContent = styled.div`
  flex: 1;
`;

const ReturnPolicyLabel = styled.p`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const ReturnPolicyText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
`;

interface ProductDetailDisplayProps {
  product: Product;
}

const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({ product }) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  // Label when options are selected but no DB-backed variant matches (e.g. "Thin / 12×18 / Black")
  const [selectionLabel, setSelectionLabel] = useState<string>('');
  // Overall stock availability from supplier-managed variant inventory.
  // null = variants not yet loaded (fall back to product.stock_quantity).
  const [anyVariantInStock, setAnyVariantInStock] = useState<boolean | null>(null);

  // True when a specific variant is matched AND it has no stock.
  // Undefined/null selected variant means no variant system → don't block.
  const isVariantOutOfStock = selectedVariant !== null && selectedVariant.stock_quantity <= 0;

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Review form state
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  // Related products state
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // FAQ accordion state
  const [faqOpenItems, setFaqOpenItems] = useState<Record<number, boolean>>({});

  // Collapsible sections state (Product Highlights, Description, FAQs, Returns)
  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    highlights: true,
    description: false,
    faqs: false,
    returns: false,
  });

  const toggleSection = (section: string) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch reviews for this product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?product_id=${product.id}&include_rating=true`);
        const data = await response.json();
        if (data.success) {
          setReviews(data.data.reviews || []);
          setAverageRating(data.data.rating || 0);
          setReviewCount(data.data.reviewCount || 0);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (product?.id) {
      fetchReviews();
    }
  }, [product?.id]);

  // Fetch related products (same category, excluding current product)
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const categoryParam = product.category ? `&category=${encodeURIComponent(product.category)}` : '';
        const response = await fetch(`/api/products?limit=4${categoryParam}`);
        const data = await response.json();
        if (data.success && data.data?.products) {
          // Filter out current product and take up to 4
          const related = data.data.products
            .filter((p: Product) => p.id !== product.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to fetch related products:', err);
      }
    };

    if (product?.id) {
      fetchRelatedProducts();
    }
  }, [product?.id, product?.category]);

  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (newRating === 0) {
      setReviewError('Please select a rating');
      return;
    }

    if (!newComment.trim()) {
      setReviewError('Please write a comment');
      return;
    }

    setSubmitLoading(true);
    setReviewError(null);
    setReviewSuccess(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          rating: newRating,
          comment: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReviewSuccess('Review submitted! It will be visible after moderation.');
        setNewRating(0);
        setNewComment('');
      } else {
        setReviewError(data.error || 'Failed to submit review');
      }
    } catch (err) {
      setReviewError('Failed to submit review. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Get display price - use variant price if selected, otherwise product price
  const baseDisplayPrice = parsePrice(product.sale_price) || parsePrice(product.price);
  const baseOriginalPrice = parsePrice(product.price);
  const baseHasDiscount = baseOriginalPrice > 0 && baseOriginalPrice > baseDisplayPrice;
  const baseDiscountPercentage = baseHasDiscount ? getDiscountPercentage(baseOriginalPrice, baseDisplayPrice) : 0;

  // Override with variant price if variant is selected
  const displayPrice = selectedVariant
    ? (selectedVariant.sale_price || selectedVariant.price)
    : baseDisplayPrice;
  const originalPrice = selectedVariant
    ? (selectedVariant.sale_price ? selectedVariant.price : baseOriginalPrice)
    : baseOriginalPrice;
  const hasDiscount = selectedVariant
    ? (selectedVariant.sale_price !== undefined && selectedVariant.sale_price < selectedVariant.price)
    : baseHasDiscount;
  const discountPercentage = hasDiscount ? getDiscountPercentage(originalPrice, displayPrice) : 0;

  const handleAddToCart = async () => {
    if (!product) return;

    // Clear any previous errors
    setError(null);

    // Check if user is authenticated
    if (!user) {
      // Redirect to auth page with return URL
      router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // Use variant price if variant is selected
    const priceToAdd = selectedVariant
      ? (selectedVariant.sale_price || selectedVariant.price)
      : displayPrice;

    try {
      // Add to cart with variant info if available.
      // When no DB variant exists, use the selectionLabel so the cart still records the
      // user's chosen options (e.g. "Thin / 12×18 / Black").
      await addItem({
        id: Date.now(),
        product_id: product.id,
        variant_id: selectedVariant?.id,
        variant_name: selectedVariant?.variant_name || selectionLabel || undefined,
        quantity: quantity,
        name: product.name,
        price: priceToAdd,
        description: product.description || '',
        image_url: product.image_url || '',
      });
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to add item to cart');
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };


  // Get all available images
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [{ url: product.primary_image || product.image_url }];

  // Get the currently selected image
  const selectedImage = productImages[selectedImageIndex] || productImages[0];
  const selectedImageUrl = typeof selectedImage === 'string' ? selectedImage : (selectedImage?.url || '');

  return (
    <ProductDetailContainer>
      {/* Force re-render when language changes */}
      <div data-lang={language} style={{ display: 'none' }} />

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav>
        <BreadcrumbItem onClick={() => router.push('/')}>{t('home')}</BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        {product.category && (
          <>
            <BreadcrumbItem onClick={() => router.push(`/shop?category=${encodeURIComponent(product.category as string)}`)}>
              {t(product.category.toLowerCase().replace(' ', '') as any) || product.category}
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </>
        )}
        {product.subcategory && (
          <>
            <BreadcrumbItem onClick={() => router.push(`/shop?category=${encodeURIComponent(product.category || '')}&subcategory=${encodeURIComponent(product.subcategory as string)}`)}>
              {t(product.subcategory.toLowerCase().replace(/[^a-z]/g, '') as any) || product.subcategory}
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbCurrent>{product.name}</BreadcrumbCurrent>
      </BreadcrumbNav>

      {/* Main Product Section */}
      <ProductDetailContent>
        {/* Product Images - Left Column */}
        <div style={{ width: '100%' }}>
          <ProductImageContainer>
            <ProductDetailImage
              imageClass={product.imageClass}
              imageUrl={selectedImageUrl}
              style={{ width: '100%', height: '500px' } as React.CSSProperties}
            />
            <ShippingBadge>✓ {t('freeShipping')}</ShippingBadge>
            {(() => {
              // Use supplier-managed variant stock when available;
              // fall back to product.stock_quantity for non-variant products.
              const outOfStock = anyVariantInStock !== null
                ? !anyVariantInStock
                : (product.stock_quantity !== undefined && product.stock_quantity <= 0);
              return (
                <StockBadge style={outOfStock ? { backgroundColor: 'rgba(254,242,242,0.95)', color: '#dc2626' } : undefined}>
                  {outOfStock ? t('outOfStock') : t('inStock')}
                </StockBadge>
              );
            })()}
            {hasDiscount && (
              <DiscountBadge>{discountPercentage}% OFF</DiscountBadge>
            )}
          </ProductImageContainer>

          {/* Thumbnail Gallery */}
          <ThumbnailGallery>
            {productImages.slice(0, 4).map((image: any, index: number) => (
              <ThumbnailButton
                key={index}
                active={index === selectedImageIndex}
                onClick={() => setSelectedImageIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                <ProductDetailImage
                  imageClass={product.imageClass}
                  imageUrl={image.url || image}
                  style={{ width: '100%', height: '100%' } as React.CSSProperties}
                />
              </ThumbnailButton>
            ))}
          </ThumbnailGallery>
        </div>

        {/* Product Info - Right Column */}
        <ProductDetailInfo>
          {/* Title first, then Category inline */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <ProductDetailTitle style={{ fontSize: '1.25rem', marginBottom: '0' }}>
              {product.name}
            </ProductDetailTitle>
            <ProductCategoryTag style={{ fontSize: '0.65rem', padding: '0.2rem 0.4rem' }}>
              {product.category || 'Furniture'}
            </ProductCategoryTag>
          </div>

          {/* Rating inline */}
          <RatingContainer style={{ margin: '0.25rem 0', padding: '0.25rem 0' }}>
            <div style={{ display: 'flex', gap: '0.125rem' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} style={{ width: '1rem', height: '1rem', fill: i < Math.round(averageRating) ? '#f59e0b' : '#d1d5db' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <ReviewsCount style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{averageRating.toFixed(1)}</span>
              <span style={{ color: '#6b7280' }}> ({reviewCount})</span>
            </ReviewsCount>
          </RatingContainer>

          {/* Price inline - label, price, discount, guarantee all on one line */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('price')}:</span>
            <ProductDetailPrice style={{ fontSize: '1.25rem', marginBottom: '0' }}>
              ₹{displayPrice.toLocaleString()}
            </ProductDetailPrice>
            {hasDiscount && (
              <>
                <OriginalPriceText style={{ fontSize: '1rem' }}>₹{originalPrice.toLocaleString()}</OriginalPriceText>
                <DiscountPercentage style={{ fontSize: '0.75rem' }}>{discountPercentage}% OFF</DiscountPercentage>
              </>
            )}
            <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '500' }}>✓ {t('bestPriceGuarantee')}</span>
          </div>

          <ProductDetailDescription style={{ marginBottom: '0.5rem' }}>
            {product.description}
          </ProductDetailDescription>

          {/* Variant Selector */}
          <VariantSelector
            productId={product.id}
            onVariantChange={(variant, label) => {
              setSelectedVariant(variant);
              setSelectionLabel(label || '');
            }}
            onStockChange={setAnyVariantInStock}
          />

          {/* Quantity Selector - inline compact */}
          <QuantitySelector style={{ margin: '0.25rem 0', gap: '0.5rem' }}>
            <span style={{ color: '#374151', fontWeight: '500', fontSize: '0.75rem' }}>{t('quantity')}:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
              <QuantityButton style={{ padding: '0.25rem 0.5rem' }}
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </QuantityButton>
              <QuantityDisplay style={{ minWidth: '2rem', fontSize: '0.875rem' }}>{quantity}</QuantityDisplay>
              <QuantityButton style={{ padding: '0.25rem 0.5rem' }}
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </QuantityButton>
            </div>
          </QuantitySelector>

          {/* Add to Cart & Actions */}
          <ActionButtons style={{ margin: '0.25rem 0' }}>
            <AddToCartButton style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
              onClick={handleAddToCart}
              disabled={isLoading || isVariantOutOfStock}
            >
              {isLoading ? (
                <>
                  <svg style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : isVariantOutOfStock ? (
                t('outOfStock')
              ) : (
                `${t('addToCart')} — ₹${(displayPrice * quantity).toLocaleString()}`
              )}
            </AddToCartButton>
            <WishlistButton style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }} title="Add to Wishlist">
              ♡
            </WishlistButton>
          </ActionButtons>

          {error && (
            <ErrorMessage style={{ padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
              {error}
            </ErrorMessage>
          )}

          {/* Trust badges - compact inline */}
          <TrustBadges style={{ padding: '0.35rem 0', marginTop: '0' }}>
            <TrustBadgeItem style={{ padding: '0 0.35rem' }}>
              <TrustBadgeIcon style={{ fontSize: '0.8rem' }}>✓</TrustBadgeIcon>
              <TrustBadgeText style={{ fontSize: '0.65rem' }}>{t('dayReturns')}</TrustBadgeText>
            </TrustBadgeItem>
            <TrustBadgeItem style={{ padding: '0 0.35rem' }}>
              <TrustBadgeIcon style={{ fontSize: '0.8rem' }}>🔒</TrustBadgeIcon>
              <TrustBadgeText style={{ fontSize: '0.65rem' }}>{t('securePayment')}</TrustBadgeText>
            </TrustBadgeItem>
            <TrustBadgeItem style={{ padding: '0 0.35rem' }}>
              <TrustBadgeIcon style={{ fontSize: '0.8rem' }}>📦</TrustBadgeIcon>
              <TrustBadgeText style={{ fontSize: '0.65rem' }}>{t('expressDelivery')}</TrustBadgeText>
            </TrustBadgeItem>
          </TrustBadges>

          {/* Collapsible Sections - Product Highlights, Description, FAQs, Returns */}
          {/* Product Highlights */}
          <CollapsibleSection>
            <CollapsibleHeader onClick={() => toggleSection('highlights')}>
              <span>Product Highlights</span>
              <CollapsibleChevron $isOpen={sectionsOpen.highlights}>▼</CollapsibleChevron>
            </CollapsibleHeader>
            <CollapsibleContent $isOpen={sectionsOpen.highlights}>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>{product.dimensions || '80cm x 70cm x 45cm'} dimensions</HighlightText>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>{product.material || 'Premium Wood & Metal'} construction</HighlightText>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>{product.warranty || '2 Years'} warranty</HighlightText>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>{product.color || 'Walnut Finish'} finish</HighlightText>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>Weight: {product.weight || '15kg'}</HighlightText>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>Assembly: {product.assembly_required ? t('required') : t('notRequired')}</HighlightText>
              </HighlightItem>
            </CollapsibleContent>
          </CollapsibleSection>

          {/* Product Description */}
          <CollapsibleSection>
            <CollapsibleHeader onClick={() => toggleSection('description')}>
              <span>{t('description')}</span>
              <CollapsibleChevron $isOpen={sectionsOpen.description}>▼</CollapsibleChevron>
            </CollapsibleHeader>
            <CollapsibleContent $isOpen={sectionsOpen.description}>
              {product.description}
            </CollapsibleContent>
          </CollapsibleSection>

          {/* FAQs */}
          <CollapsibleSection>
            <CollapsibleHeader onClick={() => toggleSection('faqs')}>
              <span>FAQs</span>
              <CollapsibleChevron $isOpen={sectionsOpen.faqs}>▼</CollapsibleChevron>
            </CollapsibleHeader>
            <CollapsibleContent $isOpen={sectionsOpen.faqs}>
              {(product.faqs && product.faqs.length > 0) ? (
                product.faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#1f2937', display: 'block', marginBottom: '0.25rem' }}>{faq.question}</strong>
                    <span>{faq.answer}</span>
                  </div>
                ))
              ) : (
                <>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#1f2937', display: 'block', marginBottom: '0.25rem' }}>{t('shippingInfo')}</strong>
                    <span>{t('deliveryIn5_7Days')}. {t('freeShippingAbove')}.</span>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#1f2937', display: 'block', marginBottom: '0.25rem' }}>{t('warrantyInfo')}</strong>
                    <span>{t('warrantyPeriod')}.</span>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#1f2937', display: 'block', marginBottom: '0.25rem' }}>{t('cancellationPolicy')}</strong>
                    <span>{t('cancelBeforeDispatch')}.</span>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </CollapsibleSection>

          {/* Returns & Exchange Policy */}
          <CollapsibleSection>
            <CollapsibleHeader onClick={() => toggleSection('returns')}>
              <span>Returns & Exchange Policy</span>
              <CollapsibleChevron $isOpen={sectionsOpen.returns}>▼</CollapsibleChevron>
            </CollapsibleHeader>
            <CollapsibleContent $isOpen={sectionsOpen.returns}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: '#1f2937' }}>
                  {product.return_policy === 'no_return' ? t('noReturn') :
                   product.return_policy === 'exchange_only' ? t('exchangeOnly') :
                   t('standardReturn')}
                </strong>
              </div>
              <p style={{ marginBottom: '0.5rem' }}>
                {product.return_policy === 'no_return' ? t('noReturnsOnCustom') :
                 product.return_policy === 'exchange_only' ? t('exchangeOnlyPolicy') :
                 t('returnsWithin7Days')}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>• {t('deliveryIn5_7Days')}</p>
              <p style={{ marginBottom: '0.5rem' }}>• {t('warrantyPeriod')}</p>
              <p>• {t('cancelBeforeDispatch')}</p>
            </CollapsibleContent>
          </CollapsibleSection>
        </ProductDetailInfo>
      </ProductDetailContent>

      {/* Customer Reviews - compact */}
      <ReviewsSection>
        <ReviewsHeader>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>{t('customerReviews')}</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReviewStarsContainer>
              {[...Array(5)].map((_, i) => (
                <svg key={i} style={{ width: '0.875rem', height: '0.875rem', fill: i < Math.round(averageRating) ? '#f59e0b' : '#d1d5db' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </ReviewStarsContainer>
            <span style={{ color: '#4b5563', fontWeight: '500', marginLeft: '0.25rem', fontSize: '0.75rem' }}>
              {averageRating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        </ReviewsHeader>

        {/* Write a Review Form */}
        <ReviewForm onSubmit={handleSubmitReview}>
          <ReviewFormTitle>
            {user ? t('writeReview') : t('signInToReview')}
          </ReviewFormTitle>

          {reviewError && (
            <p style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '0.75rem' }}>{reviewError}</p>
          )}
          {reviewSuccess && (
            <p style={{ color: '#16a34a', marginBottom: '0.5rem', fontSize: '0.75rem' }}>{reviewSuccess}</p>
          )}

          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#374151' }}>{t('rating')}</label>
            <StarRatingInput>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  type="button"
                  $filled={star <= newRating}
                  onClick={() => user && setNewRating(star)}
                  disabled={!user}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </StarButton>
              ))}
            </StarRatingInput>
          </div>

          <ReviewTextarea
            placeholder={user ? "Share your experience..." : "Sign in to write a review"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user}
          />

          <SubmitReviewButton style={{ fontSize: '0.75rem' }} type="submit" disabled={!user || submitLoading}>
            {submitLoading ? 'Submitting...' : user ? t('submitReview') : 'Sign In'}
          </SubmitReviewButton>
        </ReviewForm>

        {/* Reviews List */}
        {reviewsLoading ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem' }}>Loading...</p>
        ) : reviews.length > 0 ? (
          <div style={{ maxHeight: '12rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {reviews.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewName>{review.user_name || 'Anonymous'}</ReviewName>
                  <ReviewDate>{new Date(review.created_at).toLocaleDateString()}</ReviewDate>
                </ReviewHeader>
                <ReviewStarsSmall>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      style={{
                        width: '0.75rem',
                        height: '0.75rem',
                        fill: i < review.rating ? '#f59e0b' : '#d1d5db'
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </ReviewStarsSmall>
                <ReviewComment style={{ fontSize: '0.75rem' }}>{review.comment}</ReviewComment>
              </ReviewItem>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem' }}>
            {t('noReviews')}
          </p>
        )}
      </ReviewsSection>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProductsSection>
          <RelatedProductsTitle>{t('youMayAlsoLike')}</RelatedProductsTitle>
          <RelatedProductsGrid>
            {relatedProducts.map((relatedProduct) => {
              const rpOriginal    = parsePrice(relatedProduct.price);
              const rpDisplay     = parsePrice(relatedProduct.sale_price) || rpOriginal;
              const rpHasDiscount = rpOriginal > 0 && rpOriginal > rpDisplay;
              return (
                <RelatedProductCard
                  key={relatedProduct.id}
                  onClick={() => router.push(`/products/${relatedProduct.slug || relatedProduct.id}`)}
                >
                  <RelatedProductImageContainer>
                    <ProductDetailImage
                      imageClass={relatedProduct.imageClass}
                      imageUrl={relatedProduct.primary_image || relatedProduct.image_url || ''}
                      style={{ width: '100%', height: '100%' } as React.CSSProperties}
                    />
                    {rpHasDiscount && (
                      <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        {getDiscountPercentage(rpOriginal, rpDisplay)}% OFF
                      </div>
                    )}
                  </RelatedProductImageContainer>
                  <RelatedProductInfo>
                    <RelatedProductName>{relatedProduct.name}</RelatedProductName>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#c19a6b' }}>
                        ₹{rpDisplay.toLocaleString()}
                      </p>
                      {rpHasDiscount && (
                        <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{rpOriginal.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </RelatedProductInfo>
                </RelatedProductCard>
              );
            })}
          </RelatedProductsGrid>
        </RelatedProductsSection>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetailDisplay;
