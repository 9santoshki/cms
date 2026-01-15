'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Product, Review } from '@/types';
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

// Review form components
const ReviewForm = styled.form`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ReviewFormTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const StarRatingInput = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${props => props.$filled ? '#f59e0b' : '#d1d5db'};
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: #f59e0b;
  }
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }
`;

const SubmitReviewButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #d97706, #b45309);
  color: white;
  font-weight: 600;
  border-radius: 8px;
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
  gap: 1rem;
  margin: 1.5rem 0 2rem;
  padding-bottom: 1.5rem;
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
  margin: 1.5rem 0;
`;

const QuantityButton = styled.button`
  padding: 0.75rem 1.25rem;
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
`;

// Action buttons
const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
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

  &:hover {
    background: linear-gradient(90deg, #b45309, #92400e);
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const WishlistButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 2px solid #d1d5db;
  color: #1f2937;
  font-weight: 600;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #f59e0b;
    background-color: #fffbeb;
  }
`;

// Trust badges
const TrustBadges = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
  margin-top: 1.5rem;
`;

const TrustBadgeItem = styled.div`
  text-align: center;
`;

const TrustBadgeIcon = styled.div`
  font-size: 1.5rem;
  color: #d97706;
  margin-bottom: 0.5rem;
`;

const TrustBadgeText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
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

// Reviews section
const ReviewsSection = styled.div`
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ReviewStarsContainer = styled.div`
  display: flex;
  margin-right: 0.5rem;
`;

const ReviewItem = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ReviewName = styled.h4`
  font-weight: 500;
  color: #1f2937;
`;

const ReviewDate = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ReviewStarsSmall = styled.div`
  display: flex;
  margin: 0.5rem 0;
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

interface ProductDetailDisplayProps {
  product: Product;
}

// Helper function to safely parse price (handles string or number)
const parsePrice = (price: any): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  return 0;
};

// Helper function to calculate discount percentage
const getDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({ product }) => {
  const { user } = useAuth();
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  // Get display price (sale_price or price) - parse to ensure numeric comparison
  const displayPrice = parsePrice(product.sale_price) || parsePrice(product.price);
  const originalPrice = parsePrice(product.original_price);
  const hasDiscount = originalPrice > 0 && originalPrice > displayPrice;
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

    try {
      // Add to cart using the display price (sale price if available)
      await addItem({
        id: Date.now(),
        product_id: product.id,
        quantity: quantity,
        name: product.name,
        price: displayPrice,
        description: product.description || '',
        image_url: product.image_url || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to add item to cart');
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
            <ShippingBadge>✓ Free Shipping</ShippingBadge>
            <StockBadge>In Stock</StockBadge>
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
          <div style={{ marginBottom: '1.5rem' }}>
            <ProductCategoryTag>
              {product.category || 'Furniture'}
            </ProductCategoryTag>
          </div>

          <ProductDetailTitle>
            {product.name}
          </ProductDetailTitle>

          <RatingContainer>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} style={{ width: '1.25rem', height: '1.25rem', fill: i < Math.round(averageRating) ? '#f59e0b' : '#d1d5db' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <ReviewsCount>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{averageRating.toFixed(1)}</span>
              <span style={{ color: '#6b7280' }}> ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
            </ReviewsCount>
          </RatingContainer>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Price</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <ProductDetailPrice>
                ₹{displayPrice.toLocaleString()}
              </ProductDetailPrice>
              {hasDiscount && (
                <>
                  <OriginalPriceText>₹{originalPrice.toLocaleString()}</OriginalPriceText>
                  <DiscountPercentage>{discountPercentage}% OFF</DiscountPercentage>
                </>
              )}
            </div>
            <p style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '500', marginTop: '0.75rem' }}>✓ Best Price Guarantee</p>
          </div>

          <ProductDetailDescription>
            {product.description}
          </ProductDetailDescription>

          {/* Quantity Selector */}
          <QuantitySelector>
            <span style={{ color: '#374151', fontWeight: '500', fontSize: '0.875rem' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
              <QuantityButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </QuantityButton>
            </div>
          </QuantitySelector>

          {/* Add to Cart & Actions */}
          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding to Cart...
                </>
              ) : (
                `Add to Cart — ₹${(displayPrice * quantity).toLocaleString()}`
              )}
            </AddToCartButton>
            <WishlistButton>
              ♡ Add to Wishlist
            </WishlistButton>
          </ActionButtons>

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {/* Trust badges */}
          <TrustBadges>
            <TrustBadgeItem>
              <TrustBadgeIcon>✓</TrustBadgeIcon>
              <TrustBadgeText>30-Day Returns</TrustBadgeText>
            </TrustBadgeItem>
            <TrustBadgeItem>
              <TrustBadgeIcon>🔒</TrustBadgeIcon>
              <TrustBadgeText>Secure Payment</TrustBadgeText>
            </TrustBadgeItem>
            <TrustBadgeItem>
              <TrustBadgeIcon>📦</TrustBadgeIcon>
              <TrustBadgeText>Express Delivery</TrustBadgeText>
            </TrustBadgeItem>
          </TrustBadges>
        </ProductDetailInfo>
      </ProductDetailContent>

      {/* Additional Information Section */}
      <DescriptionSection>
        <div>
          <SectionTitle>Description</SectionTitle>
          <DescriptionText>
            {product.description}
          </DescriptionText>
        </div>

        <div>
          <SectionTitle>Specifications</SectionTitle>
          <SpecificationsList>
            <SpecificationItem>
              <SpecificationLabel>Dimensions</SpecificationLabel>
              <SpecificationValue>{product.dimensions || '80cm x 70cm x 45cm'}</SpecificationValue>
            </SpecificationItem>
            <SpecificationItem>
              <SpecificationLabel>Material</SpecificationLabel>
              <SpecificationValue>{product.material || 'Premium Wood & Metal'}</SpecificationValue>
            </SpecificationItem>
            <SpecificationItem>
              <SpecificationLabel>Weight</SpecificationLabel>
              <SpecificationValue>{product.weight || '15kg'}</SpecificationValue>
            </SpecificationItem>
            <SpecificationItem>
              <SpecificationLabel>Color</SpecificationLabel>
              <SpecificationValue>{product.color || 'Walnut Finish'}</SpecificationValue>
            </SpecificationItem>
            <SpecificationItem>
              <SpecificationLabel>Warranty</SpecificationLabel>
              <SpecificationValue>{product.warranty || '2 Years'}</SpecificationValue>
            </SpecificationItem>
            <SpecificationItem>
              <SpecificationLabel>Assembly</SpecificationLabel>
              <SpecificationValue>{product.assembly_required ? 'Required' : 'Not Required'}</SpecificationValue>
            </SpecificationItem>
          </SpecificationsList>
        </div>
      </DescriptionSection>

      {/* Customer Reviews */}
      <ReviewsSection>
        <ReviewsHeader>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>Customer Reviews</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReviewStarsContainer>
              {[...Array(5)].map((_, i) => (
                <svg key={i} style={{ width: '1.25rem', height: '1.25rem', fill: i < Math.round(averageRating) ? '#f59e0b' : '#d1d5db' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </ReviewStarsContainer>
            <span style={{ color: '#4b5563', fontWeight: '500', marginLeft: '0.5rem' }}>
              {averageRating.toFixed(1)} out of 5 ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </ReviewsHeader>

        {/* Write a Review Form */}
        <ReviewForm onSubmit={handleSubmitReview}>
          <ReviewFormTitle>
            {user ? 'Write a Review' : 'Sign in to Write a Review'}
          </ReviewFormTitle>

          {reviewError && (
            <p style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem' }}>{reviewError}</p>
          )}
          {reviewSuccess && (
            <p style={{ color: '#16a34a', marginBottom: '1rem', fontSize: '0.875rem' }}>{reviewSuccess}</p>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>Rating</label>
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
            placeholder={user ? "Share your experience with this product..." : "Please sign in to write a review"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user}
          />

          <SubmitReviewButton type="submit" disabled={!user || submitLoading}>
            {submitLoading ? 'Submitting...' : user ? 'Submit Review' : 'Sign In to Review'}
          </SubmitReviewButton>
        </ReviewForm>

        {/* Reviews List */}
        {reviewsLoading ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div style={{ maxHeight: '24rem', overflowY: 'auto', paddingRight: '1rem' }}>
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
                        width: '1rem',
                        height: '1rem',
                        fill: i < review.rating ? '#f59e0b' : '#d1d5db'
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </ReviewStarsSmall>
                <ReviewComment>{review.comment}</ReviewComment>
              </ReviewItem>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </ReviewsSection>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProductsSection>
          <RelatedProductsTitle>You May Also Like</RelatedProductsTitle>
          <RelatedProductsGrid>
            {relatedProducts.map((relatedProduct) => (
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
                  {(() => {
                    const relOriginal = parsePrice(relatedProduct.original_price);
                    const relDisplay = parsePrice(relatedProduct.sale_price) || parsePrice(relatedProduct.price);
                    const relHasDiscount = relOriginal > 0 && relOriginal > relDisplay;
                    return relHasDiscount ? (
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
                        {getDiscountPercentage(relOriginal, relDisplay)}% OFF
                      </div>
                    ) : null;
                  })()}
                </RelatedProductImageContainer>
                <RelatedProductInfo>
                  <RelatedProductName>{relatedProduct.name}</RelatedProductName>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#c19a6b' }}>
                      ₹{(parsePrice(relatedProduct.sale_price) || parsePrice(relatedProduct.price)).toLocaleString()}
                    </p>
                    {(() => {
                      const relOriginal = parsePrice(relatedProduct.original_price);
                      const relDisplay = parsePrice(relatedProduct.sale_price) || parsePrice(relatedProduct.price);
                      return relOriginal > 0 && relOriginal > relDisplay ? (
                        <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{relOriginal.toLocaleString()}
                        </span>
                      ) : null;
                    })()}
                  </div>
                </RelatedProductInfo>
              </RelatedProductCard>
            ))}
          </RelatedProductsGrid>
        </RelatedProductsSection>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetailDisplay;
