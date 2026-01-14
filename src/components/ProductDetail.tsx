import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { 
  ProductDetailOverlay,
  ProductDetailContainer,
  CloseButton,
  ProductDetailContent,
  ProductDetailImage,
  ProductDetailInfo,
  ProductDetailTitle,
  ProductDetailPrice,
  ProductDetailDescription,
  ProductDetailActions,
  ErrorMessage
} from './ProductDetailStyles';

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { loading, error, addToCartWithAuth } = useAppContext();

  if (!product) return null;

  const handleAddToCart = () => {
    const result = addToCartWithAuth(product);
    if (!result.success && result.requiresLogin) {
      // Store the pending cart action in localStorage
      localStorage.setItem('pendingCartAction', JSON.stringify({
        product: result.product,
        quantity: result.quantity
      }));
      // Trigger a global event or callback to show login modal
      // We'll handle this by creating a custom event that Header can listen to
      window.dispatchEvent(new CustomEvent('showLoginModal', { detail: { product, quantity: result.quantity } }));
    } else if (result.success && !result.requiresLogin && result.action) {
      // User is authenticated, proceed with adding to cart
      result.action();
    }
  };

  return (
    <ProductDetailOverlay>
      <ProductDetailContainer>
        <CloseButton onClick={onBack}>
          <i className="fas fa-times"></i>
        </CloseButton>
        
        <ProductDetailContent>
          <ProductDetailImage imageClass={product.imageClass} imageUrl={product.primary_image || product.image_url}></ProductDetailImage>
          
          <ProductDetailInfo>
            <ProductDetailTitle>{product.name}</ProductDetailTitle>
            <ProductDetailPrice>₹{product.price.toLocaleString()}</ProductDetailPrice>
            <ProductDetailDescription>{product.description}</ProductDetailDescription>
            
            {error.cart && <ErrorMessage>{error.cart}</ErrorMessage>}
            
            <ProductDetailActions>
              <button 
                className="btn primary" 
                onClick={handleAddToCart}
                disabled={loading.cart}
              >
                {loading.cart ? 'Adding...' : 'Add to Cart'}
              </button>
            </ProductDetailActions>
          </ProductDetailInfo>
        </ProductDetailContent>
      </ProductDetailContainer>
    </ProductDetailOverlay>
  );
};

export default ProductDetail;
export { ProductDetail };