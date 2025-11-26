"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchProducts } = useAppContext();

  useEffect(() => {
    // Read query from URL on client to avoid useSearchParams SSR warning
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      setQuery(q);
      if (q) {
        performSearch();
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const performSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await searchProducts({ q: query });
      if (result && result.products) {
        setSearchResults(result.products);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError('An error occurred during search');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="search" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-600 mt-2">
            {query ? `Results for "${query}"` : 'Please enter a search term'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 text-xl">{error}</div>
          </div>
        ) : (
          <div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => { window.location.href = `/products/${product.slug || product.id}`; }}
                  >
                    <div
                      className="h-48 bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage: product.primary_image 
                          ? `url("${product.primary_image}")`
                          : product.image_url
                          ? `url("${product.image_url}")`
                          : `url("https://images.unsplash.com/photo-1526178613552-2b45c6c38395?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80")`
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 truncate">{product.category}</p>
                      <p className="text-amber-600 font-bold mt-2">₹{product.price.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">No results found</h3>
                <p className="text-gray-600 mt-2">
                  {query
                    ? `No products match "${query}". Try different keywords.`
                    : 'Please enter a search term to find products.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;