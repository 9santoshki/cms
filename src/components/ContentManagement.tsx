'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
// Import admin styles
import { 
  AdminContainer, 
  AdminCard, 
  AdminButton,
  AdminHeader,
  AdminContent
} from '../styles/AdminStyles';

const ContentManagement = () => {
  const { user } = useAppContext();
  
  // State for content management
  const [activeTab, setActiveTab] = useState('pages');
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', slug: 'home', content: 'Welcome to our home page', updatedAt: '2023-10-15' },
    { id: 2, title: 'About', slug: 'about', content: 'About us content', updatedAt: '2023-10-10' },
    { id: 3, title: 'Contact', slug: 'contact', content: 'Contact page content', updatedAt: '2023-10-05' }
  ]);
  
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale Banner', image: 'summer-sale.jpg', active: true, startDate: '2023-07-01', endDate: '2023-08-31' },
    { id: 2, title: 'New Collection Banner', image: 'new-collection.jpg', active: false, startDate: '2023-09-01', endDate: '2023-10-31' }
  ]);
  
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'John Doe', text: 'Great service!', rating: 5, approved: true },
    { id: 2, name: 'Jane Smith', text: 'Wonderful experience', rating: 4, approved: false }
  ]);
  
  const [newPage, setNewPage] = useState({ title: '', slug: '', content: '' });
  const [newBanner, setNewBanner] = useState({ title: '', image: '', startDate: '', endDate: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', rating: 5 });

  // Check if user has admin privileges
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      // Redirect or show access denied message
      console.error('Access denied: Admin privileges required');
    }
  }, [user]);

  const handleAddPage = () => {
    if (!newPage.title || !newPage.slug) return;
    
    const page = {
      id: pages.length + 1,
      ...newPage,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setPages([...pages, page]);
    setNewPage({ title: '', slug: '', content: '' });
  };

  const handleUpdatePage = (id: number, updates: any) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : page
    ));
  };

  const handleDeletePage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };

  const handleToggleBanner = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ));
  };

  const handleApproveTestimonial = (id: number) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, approved: true } : t
    ));
  };

  const handleRejectTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <h1>Content Management</h1>
        <p>Manage your website content, banners, and user-generated content</p>
      </AdminHeader>
      
      <AdminContent>
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'pages' ? 'active' : ''}`}
            onClick={() => setActiveTab('pages')}
          >
            Pages
          </button>
          <button 
            className={`tab-button ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            Banners
          </button>
          <button 
            className={`tab-button ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            Testimonials
          </button>
        </div>

        {/* Pages Management */}
        {activeTab === 'pages' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Pages</h2>
              <AdminButton onClick={() => document.getElementById('add-page-form')?.scrollIntoView()}>
                <i className="fas fa-plus"></i> Add Page
              </AdminButton>
            </div>
            
            {/* Add Page Form */}
            <AdminCard>
              <h3>Add New Page</h3>
              <form id="add-page-form" className="admin-form">
                <div className="form-group">
                  <label htmlFor="pageTitle">Title</label>
                  <input
                    type="text"
                    id="pageTitle"
                    value={newPage.title}
                    onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pageSlug">Slug</label>
                  <input
                    type="text"
                    id="pageSlug"
                    value={newPage.slug}
                    onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                    placeholder="Enter page slug (URL)"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pageContent">Content</label>
                  <textarea
                    id="pageContent"
                    value={newPage.content}
                    onChange={(e) => setNewPage({...newPage, content: e.target.value})}
                    placeholder="Enter page content"
                    rows={6}
                  ></textarea>
                </div>
                
                <AdminButton 
                  type="button"
                  onClick={handleAddPage}
                >
                  <i className="fas fa-save"></i> Save Page
                </AdminButton>
              </form>
            </AdminCard>
            
            {/* Existing Pages */}
            <AdminCard>
              <h3>Existing Pages</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map(page => (
                      <tr key={page.id}>
                        <td>{page.id}</td>
                        <td>{page.title}</td>
                        <td>/{page.slug}</td>
                        <td>{page.updatedAt}</td>
                        <td>
                          <div className="table-actions">
                            <button 
                              className="btn secondary"
                              onClick={() => handleUpdatePage(page.id, { content: prompt('Update content:', page.content) || page.content })}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button 
                              className="btn danger"
                              onClick={() => handleDeletePage(page.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Banners Management */}
        {activeTab === 'banners' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Banners</h2>
              <AdminButton onClick={() => document.getElementById('add-banner-form')?.scrollIntoView()}>
                <i className="fas fa-plus"></i> Add Banner
              </AdminButton>
            </div>
            
            {/* Add Banner Form */}
            <AdminCard>
              <h3>Add New Banner</h3>
              <form id="add-banner-form" className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bannerTitle">Title</label>
                    <input
                      type="text"
                      id="bannerTitle"
                      value={newBanner.title}
                      onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                      placeholder="Enter banner title"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bannerImage">Image URL</label>
                    <input
                      type="text"
                      id="bannerImage"
                      value={newBanner.image}
                      onChange={(e) => setNewBanner({...newBanner, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      value={newBanner.startDate}
                      onChange={(e) => setNewBanner({...newBanner, startDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={newBanner.endDate}
                      onChange={(e) => setNewBanner({...newBanner, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <AdminButton onClick={() => {
                  if (!newBanner.title || !newBanner.image || !newBanner.startDate || !newBanner.endDate) return;
                  
                  const banner = {
                    id: banners.length + 1,
                    ...newBanner,
                    active: false
                  };
                  
                  setBanners([...banners, banner]);
                  setNewBanner({ title: '', image: '', startDate: '', endDate: '' });
                }}>
                  <i className="fas fa-save"></i> Save Banner
                </AdminButton>
              </form>
            </AdminCard>
            
            {/* Existing Banners */}
            <AdminCard>
              <h3>Existing Banners</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Active</th>
                      <th>Dates</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map(banner => (
                      <tr key={banner.id}>
                        <td>{banner.id}</td>
                        <td>{banner.title}</td>
                        <td>
                          <img 
                            src={banner.image ? `/images/${banner.image}` : '/placeholder-banner.jpg'} 
                            alt={banner.title} 
                            className="banner-thumb" 
                          />
                        </td>
                        <td>
                          <span className={`status-badge ${banner.active ? 'active' : 'inactive'}`}>
                            {banner.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {banner.startDate} to {banner.endDate}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button 
                              className={`btn ${banner.active ? 'secondary' : 'primary'}`}
                              onClick={() => handleToggleBanner(banner.id)}
                            >
                              <i className={`fas fa-${banner.active ? 'times' : 'check'}`}></i> 
                              {banner.active ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Testimonials Management */}
        {activeTab === 'testimonials' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Testimonials</h2>
              <AdminButton onClick={() => document.getElementById('add-testimonial-form')?.scrollIntoView()}>
                <i className="fas fa-plus"></i> Add Testimonial
              </AdminButton>
            </div>
            
            {/* Add Testimonial Form */}
            <AdminCard>
              <h3>Add New Testimonial</h3>
              <form className="admin-form" id="add-testimonial-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="testimonialName">Name</label>
                    <input
                      type="text"
                      id="testimonialName"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      placeholder="Enter customer name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="testimonialRating">Rating</label>
                    <select
                      id="testimonialRating"
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="testimonialText">Testimonial</label>
                  <textarea
                    id="testimonialText"
                    value={newTestimonial.text}
                    onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
                    placeholder="Enter testimonial text"
                    rows={4}
                  ></textarea>
                </div>
                
                <AdminButton onClick={() => {
                  if (!newTestimonial.name || !newTestimonial.text) return;
                  
                  const testimonial = {
                    id: testimonials.length + 1,
                    ...newTestimonial,
                    approved: false
                  };
                  
                  setTestimonials([...testimonials, testimonial]);
                  setNewTestimonial({ name: '', text: '', rating: 5 });
                }}>
                  <i className="fas fa-save"></i> Save Testimonial
                </AdminButton>
              </form>
            </AdminCard>
            
            {/* Pending Testimonials */}
            <AdminCard>
              <h3>Pending Testimonials</h3>
              <div className="testimonials-grid">
                {testimonials.filter(t => !t.approved).map(testimonial => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-rating">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                    <div className="testimonial-text">
                      "{testimonial.text}"
                    </div>
                    <div className="testimonial-author">
                      {testimonial.name}
                    </div>
                    <div className="testimonial-actions">
                      <button 
                        className="btn primary"
                        onClick={() => handleApproveTestimonial(testimonial.id)}
                      >
                        <i className="fas fa-check"></i> Approve
                      </button>
                      <button 
                        className="btn danger"
                        onClick={() => handleRejectTestimonial(testimonial.id)}
                      >
                        <i className="fas fa-times"></i> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>
            
            {/* Approved Testimonials */}
            <AdminCard>
              <h3>Approved Testimonials</h3>
              <div className="testimonials-grid">
                {testimonials.filter(t => t.approved).map(testimonial => (
                  <div key={testimonial.id} className="testimonial-card approved">
                    <div className="testimonial-rating">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                    <div className="testimonial-text">
                      "{testimonial.text}"
                    </div>
                    <div className="testimonial-author">
                      {testimonial.name}
                    </div>
                    <div className="testimonial-actions">
                      <button 
                        className="btn danger"
                        onClick={() => handleRejectTestimonial(testimonial.id)}
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>
        )}
      </AdminContent>
    </AdminContainer>
  );
};

export default ContentManagement;