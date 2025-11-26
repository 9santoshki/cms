'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/types';
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

const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({ product }) => {
  const { loading: appLoading, error: appError, addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const loading = appLoading;
  const error = appError;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const customerReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2023-10-15",
      comment: "Absolutely stunning piece! The craftsmanship is exceptional and it perfectly matches my living room decor."
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2023-09-22",
      comment: "Great quality and arrived well packaged. Assembly was straightforward with the provided instructions."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      date: "2023-11-05",
      comment: "This has transformed my space! The attention to detail is remarkable and it's incredibly comfortable too."
    }
  ];

  return (
    <ProductDetailContainer>
      {/* Main Product Section */}
      <ProductDetailContent>
        {/* Product Images - Left Column */}
        <div style={{ width: '100%' }}>
          <ProductImageContainer>
            <ProductDetailImage
              imageClass={product.imageClass}
              imageUrl={product.image_url || ''}
              style={{ width: '100%', height: '500px' } as React.CSSProperties}
            />
            <ShippingBadge>✓ Free Shipping</ShippingBadge>
            <StockBadge>In Stock</StockBadge>
          </ProductImageContainer>

          {/* Thumbnail Gallery */}
          <ThumbnailGallery>
            {[1, 2, 3, 4].map((item) => (
              <ThumbnailButton
                key={item}
                active={item === 1}
              >
                <ProductDetailImage
                  imageClass={product.imageClass}
                  imageUrl={product.image_url || ''}
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
                <svg key={i} style={{ width: '1.25rem', height: '1.25rem', fill: '#f59e0b' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <ReviewsCount>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>4.8</span>
              <span style={{ color: '#6b7280' }}> (42 reviews)</span>
            </ReviewsCount>
            <Separator>|</Separator>
            <ReviewsCount>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>150+</span>
              <span style={{ color: '#6b7280' }}> sold</span>
            </ReviewsCount>
          </RatingContainer>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Price</div>
            <ProductDetailPrice>
              ₹{product.price.toLocaleString()}
            </ProductDetailPrice>
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
              disabled={loading.cart}
            >
              {loading.cart ? (
                <>
                  <svg style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding to Cart...
                </>
              ) : (
                `Add to Cart — ₹${(product.price * quantity).toLocaleString()}`
              )}
            </AddToCartButton>
            <WishlistButton>
              ♡ Add to Wishlist
            </WishlistButton>
          </ActionButtons>

          {error.cart && (
            <ErrorMessage>
              {error.cart}
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
                <svg key={i} style={{ width: '1.25rem', height: '1.25rem', fill: '#f59e0b' }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </ReviewStarsContainer>
            <span style={{ color: '#4b5563', fontWeight: '500', marginLeft: '0.5rem' }}>4.8 out of 5</span>
          </div>
        </ReviewsHeader>

        <div style={{ maxHeight: '24rem', overflowY: 'auto', paddingRight: '1rem' }}>
          {customerReviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewHeader>
                <ReviewName>{review.name}</ReviewName>
                <ReviewDate>{review.date}</ReviewDate>
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

        <SeeAllReviewsButton>
          See all reviews
        </SeeAllReviewsButton>
      </ReviewsSection>

      {/* Related Products */}
      <RelatedProductsSection>
        <RelatedProductsTitle>You May Also Like</RelatedProductsTitle>
        <RelatedProductsGrid>
          {Array.from({ length: 4 }, (_, i) => ({
            id: product.id + i + 100,
            name: `${product.category || 'Furniture'} ${i + 1}`,
            price: product.price * (0.8 + i * 0.1),
            imageClass: product.imageClass,
            image_url: undefined,
            description: `Elegant ${product.category || 'item'} with premium quality craftsmanship`
          })).map((relatedProduct) => (
            <RelatedProductCard key={relatedProduct.id}>
              <RelatedProductImageContainer>
                <ProductDetailImage
                  imageClass={relatedProduct.imageClass}
                  imageUrl={relatedProduct.image_url || ''}
                  style={{ width: '100%', height: '100%' } as React.CSSProperties}
                />
                <WishlistIcon>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </WishlistIcon>
              </RelatedProductImageContainer>
              <RelatedProductInfo>
                <RelatedProductName>{relatedProduct.name}</RelatedProductName>
                <RelatedProductStars>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} style={{ width: '1rem', height: '1rem', fill: '#f59e0b' }} viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </RelatedProductStars>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>₹{relatedProduct.price.toLocaleString()}</p>
              </RelatedProductInfo>
            </RelatedProductCard>
          ))}
        </RelatedProductsGrid>
      </RelatedProductsSection>
    </ProductDetailContainer>
  );
};

export default ProductDetailDisplay;
