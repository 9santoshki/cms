'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import MiniVariantSelector from './MiniVariantSelector';
import { parsePrice, getDisplayPrice, getDiscountPercentage } from '../lib/utils';

// Styles - imported from consuming components' style files
import { ProductCard, ProductImage, ProductInfo, DiscountBadge } from '../styles/NewShopStyles';

interface ProductCardWithVariantProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number | string;
    sale_price?: number | string;
    slug?: string;
    primary_image?: string;
    image_url?: string;
    imageClass?: string;
  };
  onClick?: () => void;
  /** Width for horizontal row layout (e.g., '180px') - defaults to auto-fill in grid */
  width?: string;
}

/** Quantity control button styles - shared constant */
const QUANTITY_BTN_STYLE = {
  width: '28px',
  height: '100%',
  border: 'none',
  background: '#fff8ed',
  color: '#d97706',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};

const ProductCardWithVariant: React.FC<ProductCardWithVariantProps> = ({ product, onClick, width }) => {
  const router = useRouter();
  const { user } = useAuth();
  const cartItems = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addItem);
  const updateCartItem = useCartStore(state => state.updateItem);
  const removeFromCart = useCartStore(state => state.removeItem);

  // Track selected variant for this product
  const [selectedVariant, setSelectedVariant] = useState<{
    id: number | null;
    name: string;
    /** Effective (discounted) price */
    price: number;
    /** Regular price before discount — equals price when no sale */
    originalPrice: number;
  } | null>(null);
  const [productHasVariants, setProductHasVariants] = useState(false);

  // Stock error state
  const [stockError, setStockError] = useState<string | null>(null);
  const stockErrorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (stockErrorTimeoutRef.current) {
        clearTimeout(stockErrorTimeoutRef.current);
      }
    };
  }, []);

  const handleVariantSelect = useCallback((variantId: number | null, variantName: string, price: number, originalPrice: number) => {
    setSelectedVariant({ id: variantId, name: variantName, price, originalPrice });
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setStockError(null);

    // Block if product has variants but none is selected yet
    if (productHasVariants && !selectedVariant) {
      setStockError('Please select options first');
      stockErrorTimeoutRef.current = setTimeout(() => setStockError(null), 3000);
      return;
    }

    const price = selectedVariant?.price || getDisplayPrice(product);

    if (!user) {
      localStorage.setItem('pendingCartAction', JSON.stringify({ product, quantity: 1 }));
      window.dispatchEvent(new CustomEvent('showLoginModal', { detail: { product, quantity: 1 } }));
    } else {
      try {
        await addToCart({
          id: Date.now(),
          product_id: product.id,
          variant_id: selectedVariant?.id || undefined,
          variant_name: selectedVariant?.name || undefined,
          quantity: 1,
          name: product.name,
          description: product.description,
          price: price,
          image_url: product.primary_image || product.image_url,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add to cart';
        setStockError(message);
        stockErrorTimeoutRef.current = setTimeout(() => setStockError(null), 5000);
      }
    }
  };

  const handleQuantityChange = async (e: React.MouseEvent, newQty: number) => {
    e.stopPropagation();
    setStockError(null);
    const variantId = selectedVariant?.id || null;

    if (newQty <= 0) {
      removeFromCart(product.id, variantId);
    } else {
      try {
        await updateCartItem(product.id, newQty, variantId);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update quantity';
        setStockError(message);
        stockErrorTimeoutRef.current = setTimeout(() => setStockError(null), 5000);
      }
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/products/${product.slug || product.id}`);
    }
  };

  // Find cart item matching this product and variant
  const variantId = selectedVariant?.id || null;
  const cartItem = cartItems.find(
    item => item.product_id === product.id && (item.variant_id ?? null) === variantId
  );

  // When a variant is selected use its prices; otherwise fall back to product-level prices.
  const displayPrice = selectedVariant?.price ?? getDisplayPrice(product);
  const regularPrice = selectedVariant
    ? selectedVariant.originalPrice
    : parsePrice(product.price);
  const showDiscount = displayPrice < regularPrice;
  const discountPct = showDiscount
    ? getDiscountPercentage(regularPrice, displayPrice)
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: width,
        width: width || 'auto',
        flex: width ? '0 0 auto' : '1',
      }}
    >
      <ProductCard
        onClick={handleCardClick}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
      >
        {showDiscount && (
          <DiscountBadge>{discountPct}% OFF</DiscountBadge>
        )}
        <ProductImage imageClass={product.imageClass} imageUrl={product.primary_image || product.image_url} />
        <ProductInfo style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '13px', margin: '8px 0 4px 0', color: '#1a1a1a', fontWeight: '600' }}>
              {product.name}
            </h4>
            <p style={{ fontSize: '11px', color: '#555', margin: '4px 0', lineHeight: '1.3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.description}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '8px 0' }}>
            <MiniVariantSelector
              productId={product.id}
              onVariantSelect={handleVariantSelect}
              onHasVariants={setProductHasVariants}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontWeight: '600', color: '#B12704', fontSize: '14px' }}>
                  ₹{displayPrice.toLocaleString()}
                </span>
                {showDiscount && (
                  <span style={{ textDecoration: 'line-through', color: '#555', fontSize: '11px' }}>
                    ₹{regularPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {cartItem ? (
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #d97706',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '32px',
                  }}
                >
                  <button
                    onClick={e => handleQuantityChange(e, cartItem.quantity - 1)}
                    style={{ ...QUANTITY_BTN_STYLE, borderRight: '1px solid #f5d9a8' }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span style={{
                    minWidth: '24px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    userSelect: 'none',
                  }}>
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={e => handleQuantityChange(e, cartItem.quantity + 1)}
                    style={{ ...QUANTITY_BTN_STYLE, borderLeft: '1px solid #f5d9a8' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="btn secondary"
                  onClick={handleAddToCart}
                  title={productHasVariants && !selectedVariant ? 'Select options first' : 'Add to cart'}
                  style={{
                    width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', padding: '0', minWidth: '32px',
                    opacity: productHasVariants && !selectedVariant ? 0.45 : 1,
                    cursor: productHasVariants && !selectedVariant ? 'not-allowed' : 'pointer',
                  }}
                  aria-label="Add to cart"
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              )}
            </div>
            {stockError && (
              <div style={{
                fontSize: '11px',
                color: '#c0392b',
                background: '#fdf2f2',
                border: '1px solid #f5c6c6',
                borderRadius: '4px',
                padding: '4px 8px',
                marginTop: '4px',
                textAlign: 'center',
              }}>
                {stockError}
              </div>
            )}
          </div>
        </ProductInfo>
      </ProductCard>
    </div>
  );
};

export default ProductCardWithVariant;