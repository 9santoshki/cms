'use client';

import React, { useState, useRef } from 'react';

interface ProductImage {
  id: string;
  url: string;
  cloudflare_image_id: string;
  is_primary: boolean;
  display_order: number;
}

interface ProductImageManagerProps {
  productId: string;
  images: ProductImage[];
  onImagesChange?: () => void;
}

export default function ProductImageManager({
  productId,
  images: initialImages,
  onImagesChange,
}: ProductImageManagerProps) {
  const [images, setImages] = useState<ProductImage[]>(initialImages || []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress('Uploading images to Cloudflare R2...');

    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('isPrimary', images.length === 0 ? 'true' : 'false');

      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/products/images/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const successCount = data.results.filter((r: any) => r.success).length;
        setUploadProgress(`Successfully uploaded ${successCount} image(s) to Cloudflare R2!`);

        const newImages = data.results
          .filter((r: any) => r.success)
          .map((r: any) => ({
            id: r.imageId,
            url: r.url,
            cloudflare_image_id: r.cloudflareImageId,
            is_primary: r.isPrimary,
            display_order: images.length + data.results.indexOf(r),
          }));

        setImages([...images, ...newImages]);
        onImagesChange?.();

        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        setUploadProgress(`Error: ${data.error}`);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadProgress(`Error: ${error.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image? It will also be removed from Cloudflare R2.')) return;

    try {
      const response = await fetch(`/api/products/images/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setImages(images.filter((img) => img.id !== imageId));
        onImagesChange?.();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    try {
      const response = await fetch(`/api/products/images/${imageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPrimary: true }),
      });

      const data = await response.json();

      if (data.success) {
        setImages(
          images.map((img) => ({
            ...img,
            is_primary: img.id === imageId,
          }))
        );
        onImagesChange?.();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      console.error('Set primary error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .image-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .image-header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .image-header button {
            width: 100% !important;
          }
        }
      `}</style>
      <div>
      <div className="image-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fas fa-images" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
            Product Images
          </h3>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '10px 20px',
            background: uploading ? '#999' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: uploading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
          }}
        >
          {uploading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}></div>
              Uploading...
            </>
          ) : (
            <>
              <i className="fas fa-cloud-upload-alt"></i>
              Upload Images
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {uploadProgress && (
        <div style={{
          padding: '16px 20px',
          marginBottom: '20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: uploadProgress.startsWith('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
          border: uploadProgress.startsWith('Error') ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <i className={uploadProgress.startsWith('Error') ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}
             style={{
               fontSize: '20px',
               color: uploadProgress.startsWith('Error') ? '#ef4444' : '#16a34a'
             }}></i>
          <p style={{
            color: uploadProgress.startsWith('Error') ? '#ef4444' : '#16a34a',
            fontSize: '14px',
            fontWeight: '600',
            margin: 0
          }}>
            {uploadProgress}
          </p>
        </div>
      )}

      {images.length === 0 ? (
        <div style={{
          border: '2px dashed #e8d5c4',
          borderRadius: '12px',
          padding: '64px 32px',
          textAlign: 'center',
          background: 'rgba(193, 154, 107, 0.02)'
        }}>
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: '64px', color: '#e8d5c4', marginBottom: '16px' }}></i>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
            No images uploaded yet
          </h4>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Upload your first product image to Cloudflare R2
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-plus"></i>
            Upload Images
          </button>
        </div>
      ) : (
        <>
          <div className="image-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            {images.map((image) => (
              <div
                key={image.id}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid #e8d5c4',
                  transition: 'all 0.2s ease',
                  background: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c19a6b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(193, 154, 107, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e8d5c4';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'relative',
                  paddingTop: '100%',
                  background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)'
                }}>
                  <img
                    src={image.url}
                    alt="Product"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {image.is_primary && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      padding: '4px 10px',
                      background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <i className="fas fa-star" style={{ marginRight: '4px' }}></i>
                      Primary
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.7)',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  >
                    {!image.is_primary && (
                      <button
                        onClick={() => handleSetPrimary(image.id)}
                        style={{
                          padding: '8px 14px',
                          background: 'white',
                          color: '#333',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <i className="fas fa-star"></i>
                        Set Primary
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      style={{
                        padding: '8px 14px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px 16px',
            background: 'rgba(193, 154, 107, 0.05)',
            borderRadius: '8px',
            border: '1px solid #e8d5c4'
          }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.5' }}>
              <i className="fas fa-info-circle" style={{ marginRight: '8px', color: '#c19a6b' }}></i>
              <strong>{images.length}</strong> image(s) stored in Cloudflare R2.
              The primary image will be displayed in product listings and can be marked with the star icon.
            </p>
          </div>
        </>
      )}
    </div>
    </>
  );
}
