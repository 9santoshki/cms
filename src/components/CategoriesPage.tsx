'use client';

import React from 'react';
import Link from 'next/link';
import Header from './Header';
import '../App.css'; // Import the main CSS file


const CategoriesPage = () => {
  const categories = [
    {
      id: 'living-room',
      name: 'Living Room',
      description: ' Sofas, sectionals, coffee tables, and entertainment units',
      imageClass: 'living-room',
      itemCount: 24
    },
    {
      id: 'dining-room',
      name: 'Dining Room',
      description: 'Dining tables, chairs, buffets, and bar carts',
      imageClass: 'dining-room',
      itemCount: 18
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      description: 'Beds, dressers, nightstands, and wardrobes',
      imageClass: 'bedroom',
      itemCount: 21
    },
    {
      id: 'office',
      name: 'Home Office',
      description: 'Desks, office chairs, bookcases, and storage',
      imageClass: 'office',
      itemCount: 15
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      description: 'Patio furniture, outdoor dining, and garden decor',
      imageClass: 'outdoor',
      itemCount: 12
    },
    {
      id: 'lighting',
      name: 'Lighting',
      description: 'Chandeliers, table lamps, floor lamps, and pendants',
      imageClass: 'lighting',
      itemCount: 32
    },
    {
      id: 'decor',
      name: 'Decor & Accessories',
      description: 'Wall art, decorative objects, and accent pieces',
      imageClass: 'decor',
      itemCount: 45
    },
    {
      id: 'storage',
      name: 'Storage & Organization',
      description: 'Bookcases, storage benches, and organizational solutions',
      imageClass: 'storage',
      itemCount: 17
    }
  ];

  return (
    <div className="categories-page">
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>Shop by Category</h1>
          <p>Explore our curated collections designed to transform your space</p>
        </div>
      </div>

      <div className="container">
        <div className="categories-grid">
          {categories.map(category => (
            <div className="category-card" key={category.id}>
              <Link href={`/category/${category.id}`} className="category-link">
                <div className={`category-image ${category.imageClass}`}>
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                    <p>{category.itemCount} items</p>
                  </div>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;