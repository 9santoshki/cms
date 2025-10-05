import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the main CSS file
import { useAppContext } from '../context/AppContext';
import { filterProductsByCategory } from '../utils/productUtils';


const CategoryPage = () => {
  const { categoryId } = useParams();
  const { addToCart } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Category data
  const categoryData = {
    'living-room': {
      name: 'Living Room',
      description: 'Transform your living space with our curated selection of sofas, sectionals, coffee tables, and entertainment units. Create a cozy and stylish environment perfect for relaxation and entertaining.',
      products: [
        {
          id: 101,
          name: "Modern Sectional Sofa",
          price: 45999,
          description: "Contemporary 3-seater sectional sofa with premium fabric upholstery and solid wood frame. Perfect for modern living rooms.",
          imageClass: "sofa"
        },
        {
          id: 201,
          name: "Geometric Area Rug",
          price: 12999,
          description: "Handwoven geometric area rug with premium wool blend. Adds texture and warmth to any room.",
          imageClass: "rug"
        },
        {
          id: 204,
          name: "Wall Art Gallery",
          price: 15999,
          description: "Curated set of 5 abstract canvas prints with modern frames. Creates a stunning focal point in any space.",
          imageClass: "wall-art"
        },
        {
          id: 301,
          name: "Contemporary Coffee Table",
          price: 18999,
          description: "Sleek glass and metal coffee table with minimalist design. Perfect centerpiece for modern living rooms.",
          imageClass: "coffee-table"
        }
      ]
    },
    'dining-room': {
      name: 'Dining Room',
      description: 'Elevate your dining experience with our elegant collection of dining tables, chairs, buffets, and bar carts. Create memorable meals in a sophisticated setting.',
      products: [
        {
          id: 102,
          name: "Scandinavian Dining Table",
          price: 29999,
          description: "Minimalist solid oak dining table with sleek design. Seats 6 comfortably with elegant tapered legs.",
          imageClass: "dining-table"
        },
        {
          id: 202,
          name: "Ceramic Table Lamp Set",
          price: 8999,
          description: "Set of 2 handcrafted ceramic table lamps with linen shades. Perfect for bedside tables or console tables.",
          imageClass: "lamp"
        },
        {
          id: 302,
          name: "Upholstered Dining Chairs",
          price: 14999,
          description: "Set of 4 upholstered dining chairs with wooden legs. Comfortable and stylish for everyday dining.",
          imageClass: "dining-chairs"
        }
      ]
    },
    'bedroom': {
      name: 'Bedroom',
      description: 'Create your personal sanctuary with our bedroom collection featuring beds, dressers, nightstands, and wardrobes. Designed for comfort and tranquility.',
      products: [
        {
          id: 103,
          name: "Upholstered Bed Frame",
          price: 34999,
          description: "Luxurious upholstered bed frame with button-tufted headboard and sturdy metal frame. Available in multiple colors.",
          imageClass: "bed"
        },
        {
          id: 203,
          name: "Decorative Throw Pillows",
          price: 3999,
          description: "Set of 4 decorative throw pillows with various textures and patterns. Premium fabric blend for comfort.",
          imageClass: "pillows"
        },
        {
          id: 303,
          name: "Modern Nightstand",
          price: 9999,
          description: "Sleek nightstand with two drawers and open shelf. Perfect for modern bedrooms with concealed storage.",
          imageClass: "nightstand"
        }
      ]
    },
    'office': {
      name: 'Home Office',
      description: 'Boost your productivity with our home office collection featuring desks, office chairs, bookcases, and storage solutions. Designed for comfort and functionality.',
      products: [
        {
          id: 304,
          name: "Executive Office Desk",
          price: 24999,
          description: "Spacious executive desk with premium wood finish and built-in cable management. Perfect for a professional home office.",
          imageClass: "office-desk"
        },
        {
          id: 305,
          name: "Ergonomic Office Chair",
          price: 15999,
          description: "High-back ergonomic office chair with lumbar support and adjustable features for all-day comfort.",
          imageClass: "office-chair"
        }
      ]
    },
    'outdoor': {
      name: 'Outdoor',
      description: 'Extend your living space outdoors with our patio furniture, outdoor dining sets, and garden decor. Perfect for entertaining and relaxation in the fresh air.',
      products: [
        {
          id: 306,
          name: "Outdoor Dining Set",
          price: 39999,
          description: "5-piece outdoor dining set with weather-resistant materials. Includes table and 4 chairs for al fresco dining.",
          imageClass: "outdoor-dining"
        },
        {
          id: 307,
          name: "Garden Lounge Set",
          price: 29999,
          description: "Comfortable 3-piece lounge set with cushions. Perfect for relaxing in your garden or on the patio.",
          imageClass: "lounge-set"
        }
      ]
    },
    'lighting': {
      name: 'Lighting',
      description: 'Illuminate your space with our stunning collection of chandeliers, table lamps, floor lamps, and pendant lights. Each piece is designed to enhance your decor while providing functional lighting.',
      products: [
        {
          id: 202,
          name: "Ceramic Table Lamp Set",
          price: 8999,
          description: "Set of 2 handcrafted ceramic table lamps with linen shades. Perfect for bedside tables or console tables.",
          imageClass: "lamp"
        },
        {
          id: 308,
          name: "Modern Floor Lamp",
          price: 12999,
          description: "Sleek adjustable floor lamp with LED lighting. Perfect for reading corners or as ambient lighting.",
          imageClass: "floor-lamp"
        }
      ]
    },
    'decor': {
      name: 'Decor & Accessories',
      description: 'Add the finishing touches to your space with our curated selection of wall art, decorative objects, and accent pieces. Each item is chosen to enhance your personal style.',
      products: [
        {
          id: 204,
          name: "Wall Art Gallery",
          price: 15999,
          description: "Curated set of 5 abstract canvas prints with modern frames. Creates a stunning focal point in any space.",
          imageClass: "wall-art"
        },
        {
          id: 203,
          name: "Decorative Throw Pillows",
          price: 3999,
          description: "Set of 4 decorative throw pillows with various textures and patterns. Premium fabric blend for comfort.",
          imageClass: "pillows"
        }
      ]
    },
    'storage': {
      name: 'Storage & Organization',
      description: 'Keep your space organized and clutter-free with our storage and organizational solutions. From bookcases to storage benches, find the perfect piece for your needs.',
      products: [
        {
          id: 104,
          name: "Mid-Century Bookshelf",
          price: 18999,
          description: "Classic mid-century bookshelf with geometric design and solid wood construction. Multiple shelf configurations.",
          imageClass: "bookshelf"
        },
        {
          id: 309,
          name: "Storage Ottoman",
          price: 11999,
          description: "Versatile storage ottoman with hidden compartment. Perfect for entryways or at the foot of your bed.",
          imageClass: "storage-ottoman"
        }
      ]
    }
  };

  const category = categoryData[categoryId] || {
    name: 'Category Not Found',
    description: 'The category you are looking for does not exist.',
    products: []
  };

  return (
    <div className="category-page">
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="container">
        {category.products.length > 0 ? (
          <div className="products-grid">
            {category.products.map(product => (
              <div className="product-card" key={product.id}>
                <div className={`product-image ${product.imageClass}`}></div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <button className="btn small" onClick={() => openProductDetail(product)}>View Details</button>
                  <button className="btn small secondary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>Category Not Found</h2>
            <p>We couldn't find the category you're looking for.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-detail-modal">
          <div className="modal-overlay" onClick={closeProductDetail}></div>
          <div className="modal-content">
            <button className="close-button" onClick={closeProductDetail}>
              <i className="fas fa-times"></i>
            </button>
            <div className="product-detail">
              <div className={`product-image large ${selectedProduct.imageClass}`}></div>
              <div className="product-detail-info">
                <h2>{selectedProduct.name}</h2>
                <div className="product-price">₹{selectedProduct.price.toLocaleString()}</div>
                <p>{selectedProduct.description}</p>
                <button className="btn primary" onClick={() => {
                  addToCart(selectedProduct);
                  closeProductDetail();
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;