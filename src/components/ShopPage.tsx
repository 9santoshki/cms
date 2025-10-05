import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.svg';
import '../App.css';
import ProductDetail from './ProductDetail';

// Helper function to get base64 image data based on image class
const getImageUrl = (imageClass: string): string => {
  // Base64 encoded placeholder images (simplified for this example)
  // In practice, we'll use reliable external images without restrictions
  const imageMap: Record<string, string> = {
    sofa: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPnNvZmE8L3RleHQ+PC9zdmc+',
    rug: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPnJ1ZzwvdGV4dD48L3N2Zz4=',
    'wall-art': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPndhbGwgYXJ0PC90ZXh0Pjwvc3ZnPg==',
    'dining-table': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmRpbmluZyB0YWJsZTwvdGV4dD48L3N2Zz4=',
    lamp: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmxhbXA8L3RleHQ+PC9zdmc+',
    bed: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmJlZDwvdGV4dD48L3N2Zz4=',
    pillows: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPnBpbGxvd3M8L3RleHQ+PC9zdmc+',
    bookshelf: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmJvb2tzaGVsZjwvdGV4dD48L3N2Zz4=',
    modern: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPm1vZGVybiBzdHlsZTwvdGV4dD48L3N2Zz4=',
    classic: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmNsYXNzaWMgc3R5bGU8L3RleHQ+PC9zdmc+',
    coastal: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPmNvYXN0YWwgc3R5bGU8L3RleHQ+PC9zdmc+'
  };
  
  return imageMap[imageClass] || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIzMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='; // default placeholder
};

const ShopPage = () => {
  const navigate = useNavigate();
  const { user, cartItems, products, loading, error, fetchProducts, addToCart } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleLogin = (userData) => {
    // Note: setUser is not defined here, it should be from context
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Note: setUser is not defined here, it should be from context
    localStorage.removeItem('user');
  };

  // All products data organized by categories
  const categories = [
    {
      id: 'living-room',
      name: 'Living Room',
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
        }
      ]
    },
    {
      id: 'dining-room',
      name: 'Dining Room',
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
        }
      ]
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
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
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage & Organization',
      products: [
        {
          id: 104,
          name: "Mid-Century Bookshelf",
          price: 18999,
          description: "Classic mid-century bookshelf with geometric design and solid wood construction. Multiple shelf configurations.",
          imageClass: "bookshelf"
        }
      ]
    }
  ];

  const viewCart = () => {
    if (cartItems.length > 0) {
      navigate('/cart');
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/" className="logo-link">
              <div className="logo-container">
                <img 
                  src={logo} 
                  alt="Colour My Space Logo" 
                  className="logo-image" 
                />
              </div>
            </a>
          </div>
          <div className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/shop" className="nav-link active">Shop</a>
            <a href="/portfolio" className="nav-link">Portfolio</a>
            <a href="/services" className="nav-link">Services</a>
            {user && (
              <a href="/orders" className="nav-link">Orders</a>
            )}
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-icons">
            <button className="nav-icon">
              <i className="fas fa-search"></i>
            </button>
            {user ? (
              <>
                <button className="nav-icon" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
                <span className="user-greeting">Hi, {user.name}</span>
              </>
            ) : (
              <button className="nav-icon" onClick={() => navigate('/auth')}>
                <i className="fas fa-user"></i>
              </button>
            )}
            <button className="nav-icon" onClick={() => navigate('/cart')}>
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
          {/* Mobile menu toggle */}
          <div className="nav-toggle" onClick={toggleMobileMenu}>
            <span className={`bar ${isMobileMenuOpen ? 'bar--active' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'bar--active' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'bar--active' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* Shop Header */}
      <section className="shop-header-section">
        <div className="container">
          <h1 className="shop-title">Furniture & Furnishings</h1>
          <p className="shop-description">
            Discover our curated collection of premium furniture and interior furnishings 
            designed to transform your space into a haven of style and comfort.
          </p>
        </div>
      </section>

      {/* Shop Categories */}
      <section 
        className="shop-categories" 
        style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <div 
          className="container" 
          style={{ 
            display: 'block', 
            width: '100%', 
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <div style={{ 
            maxWidth: '800px', 
            width: '100%', 
            margin: '0 auto 50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 
              style={{ 
                fontSize: '2.8rem', 
                color: '#222', 
                fontWeight: 400, 
                letterSpacing: '2px',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 20px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              SHOP BY CATEGORY
            </h2>
            <div style={{
              width: '100px',
              height: '3px',
              backgroundColor: '#c19a6b'
            }}></div>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <div className="category-card" key={category.id}>
                <a href={`#${category.id}`} className="category-link">
                  <div className="shop-category-image-container" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                      <img 
                        src={getImageUrl(category.products[0]?.imageClass || 'default')} 
                        alt={category.name} 
                        style={{ 
                          maxHeight: '100%', 
                          maxWidth: '100%', 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          display: 'block'
                        }}
                        onError={(e) => {
                          console.log("Image failed to load for category:", category.name, "imageClass:", category.products[0]?.imageClass);
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.style.display = 'none'; // Hide image if it fails to load
                          // Show a fallback text in the parent container
                          target.parentElement!.style.backgroundColor = '#e0e0e0';
                          target.parentElement!.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #666; font-family: Arial, sans-serif;">No Image</div>';
                        }}
                        onLoad={(e) => {
                          console.log("Image loaded for category:", category.name, "imageClass:", category.products[0]?.imageClass);
                          // Ensure the image displays properly when it loads
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'block';
                        }}
                      />
                    </div>
                  </div>
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <p>{category.products.length} items</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {categories.map(category => (
        <section className="featured" id={category.id} key={category.id}>
          <div className="container">
            <h2 className="section-title">{category.name.toUpperCase()}</h2>
            <div className="products-grid">
              {category.products.map(product => (
                <div className="product-card" key={product.id}>
                  <div className="shop-product-image-container" style={{ height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={getImageUrl(product.imageClass)} 
                    alt={product.name} 
                    style={{ 
                      maxHeight: '100%', 
                      maxWidth: '100%', 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      display: 'block'
                    }}
                    onError={(e) => {
                      console.log("Product image failed to load:", product.name, "imageClass:", product.imageClass);
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.style.display = 'none'; // Hide image if it fails to load
                      // Show a fallback text in the parent container
                      target.parentElement!.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #666; font-family: Arial, sans-serif;">No Image Available</div>';
                    }}
                    onLoad={(e) => {
                      console.log("Product image loaded:", product.name, "imageClass:", product.imageClass);
                      // Ensure the image displays properly when it loads
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'block';
                    }}
                  />
                </div>
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
          </div>
        </section>
      ))}

      {/* View Cart Section */}
      {cartItems.length > 0 && (
        <section className="cart-summary-section">
          <div className="container">
            <div className="cart-summary">
              <p>You have {cartCount} items in your cart</p>
              <button className="btn primary" onClick={viewCart}>
                View Cart ({cartCount})
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Colour My Space</h3>
              <p>
                Creating extraordinary interiors that blend timeless elegance with contemporary functionality. 
                Award-winning design services for residential and commercial spaces.
              </p>
              <div className="social-icons">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
                <a href="#"><i className="fab fa-houzz"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
              
              <div className="footer-subsection">
                <h4>AWARDS & RECOGNITION</h4>
                <p>Featured in Architectural Digest, Elle Decor, and House Beautiful</p>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/#portfolio">Portfolio</a></li>
                <li><a href="/#services">Services</a></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Residential Design</a></li>
                <li><a href="#">Commercial Design</a></li>
                <li><a href="#">Space Planning</a></li>
                <li><a href="#">Color Consulting</a></li>
                <li><a href="#">Furniture Design</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="/shop">All Products</a></li>
                <li><a href="/shop#furniture">Furniture</a></li>
                <li><a href="/shop#furnishings">Furnishings</a></li>
                <li><a href="/shop">New Arrivals</a></li>
                <li><a href="/shop">Best Sellers</a></li>
                {user && <li><a href="/orders">Order History</a></li>}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Colour My Space Interior Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={closeProductDetail} 
          onAddToCart={addToCart} 
        />
      )}
    </div>
  );
};

export default ShopPage;