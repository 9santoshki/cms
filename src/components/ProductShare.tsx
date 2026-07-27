'use client';

import React, { useState } from 'react';

interface ProductShareProps {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
}

// ─── Share URLs ───────────────────────────────────────────────────────────────

function getShareUrls(title: string, url: string, description?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || title);

  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}%0A%0A${encodedDesc}`,
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginTop: 12,
  flexWrap: 'wrap',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#999',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginRight: 4,
};

const shareBtnStyle = (color: string): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: 8,
  border: '1px solid #e8d5c4',
  background: 'white',
  color,
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
});

const copiedStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#16a34a',
  fontWeight: 600,
  marginLeft: 4,
};

// ─── Component ────────────────────────────────────────────────────────────────

export const ProductShare: React.FC<ProductShareProps> = ({
  title,
  description,
  url,
}) => {
  const [copied, setCopied] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url;

  const shareUrls = getShareUrls(title, fullUrl, description);

  // Try Web Share API first (mobile)
  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({ title, text: description || title, url: fullUrl });
      setNativeShared(true);
      setTimeout(() => setNativeShared(false), 3000);
    } catch {
      // User cancelled — no-op
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Show native share button if Web Share API is available
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>Share:</span>

      {/* Native share (mobile) */}
      {hasNativeShare && (
        <button
          style={shareBtnStyle('#c19a6b')}
          onClick={handleNativeShare}
          title="Share"
          aria-label="Share product"
        >
          <i className="fas fa-share-alt"></i>
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#25D366')}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Facebook */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#1877F2')}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <i className="fab fa-facebook-f"></i>
      </a>

      {/* Twitter / X */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#000000')}
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <i className="fab fa-x-twitter"></i>
      </a>

      {/* Pinterest */}
      <a
        href={shareUrls.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#E60023')}
        title="Share on Pinterest"
        aria-label="Share on Pinterest"
      >
        <i className="fab fa-pinterest-p"></i>
      </a>

      {/* Email */}
      <a
        href={shareUrls.email}
        style={shareBtnStyle('#666666')}
        title="Share via Email"
        aria-label="Share via Email"
      >
        <i className="fas fa-envelope"></i>
      </a>

      {/* Copy Link */}
      <button
        style={shareBtnStyle(copied ? '#16a34a' : '#999999')}
        onClick={handleCopyLink}
        title="Copy link"
        aria-label="Copy product link"
      >
        <i className={`fas ${copied ? 'fa-check' : 'fa-link'}`}></i>
      </button>

      {copied && <span style={copiedStyle}>Link copied!</span>}
      {nativeShared && <span style={copiedStyle}>Shared!</span>}
    </div>
  );
};

export default ProductShare;
