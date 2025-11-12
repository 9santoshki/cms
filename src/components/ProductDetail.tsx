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
  const { loading, error, addToCart } = useAppContext();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <ProductDetailOverlay>
      <ProductDetailContainer>
        <CloseButton onClick={onBack}>
          <i className="fas fa-times"></i>
        </CloseButton>
        
        <ProductDetailContent>
          <ProductDetailImage imageClass={product.imageClass} imageUrl={product.image_url}></ProductDetailImage>
          
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