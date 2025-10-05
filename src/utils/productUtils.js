// Utility functions for product-related operations

// Format rating to one decimal place
export const formatRating = (rating) => {
  if (typeof rating !== 'number' || isNaN(rating)) {
    return '0.0';
  }
  return rating.toFixed(1);
};

// Add demo data to products
export const addDemoDataToProducts = (products) => {
  if (!Array.isArray(products)) {
    return [];
  }
  
  return products.map(product => {
    // Ensure price is a number
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    
    return {
      ...product,
      originalPrice: price * 1.2, // For demo purposes
      discount: Math.floor(Math.random() * 30) + 10, // For demo purposes
      rating: Math.random() * 2 + 3, // For demo purposes (3.0-5.0)
      reviewCount: Math.floor(Math.random() * 500) + 1, // For demo purposes
      prime: Math.random() > 0.3, // For demo purposes
      freeDelivery: Math.random() > 0.2, // For demo purposes
      deliveryDate: Math.random() > 0.5 ? "Tomorrow" : `Sep ${24 + Math.floor(Math.random() * 5) + 1}`, // For demo purposes
      category: product.category || 'living-room' // Default category if not provided
    };
  });
};

// Filter products based on search query, category, and price range
export const filterProducts = (products, searchQuery, selectedCategory, priceRange) => {
  if (!Array.isArray(products)) {
    return [];
  }
  
  return products.filter(product => {
    // Ensure product has required properties
    if (!product.name || !product.description || typeof product.price !== 'number') {
      return false;
    }
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });
};

// Sort products based on sort criteria
export const sortProducts = (products, sortBy) => {
  if (!Array.isArray(products)) {
    return [];
  }
  
  return [...products].sort((a, b) => {
    // Ensure products have required properties for sorting
    if (!a || !b) return 0;
    
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return (b.id || 0) - (a.id || 0);
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      default:
        return (a.id || 0) - (b.id || 0); // Featured (default order)
    }
  });
};

// Paginate products
export const paginateProducts = (products, currentPage, productsPerPage) => {
  if (!Array.isArray(products) || currentPage < 1 || productsPerPage < 1) {
    return [];
  }
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  return products.slice(indexOfFirstProduct, indexOfLastProduct);
};

// Calculate total pages
export const calculateTotalPages = (products, productsPerPage) => {
  if (!Array.isArray(products) || productsPerPage <= 0) {
    return 0;
  }
  
  return Math.ceil(products.length / productsPerPage);
};

// Categories for filter
export const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'living-room', name: 'Living Room' },
  { id: 'dining-room', name: 'Dining Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'office', name: 'Home Office' },
  { id: 'storage', name: 'Storage' },
  { id: 'decor', name: 'Decor' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'lighting', name: 'Lighting' }
];