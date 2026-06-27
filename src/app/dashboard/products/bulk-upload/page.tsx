'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

interface UploadResult {
  created_products: number;
  created_variants: number;
  errors: { row: number; error: string }[];
}

const BulkUploadPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/auth?redirect=/dashboard/products/bulk-upload');
    } else if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)' }}>
        <div style={{ width: 48, height: 48, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }
  if (user.role !== 'admin' && user.role !== 'moderator') return null;

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { setUploadError('Please select a CSV file.'); return; }
    if (!file.name.toLowerCase().endsWith('.csv')) { setUploadError('Only .csv files are supported.'); return; }

    setUploading(true);
    setUploadError(null);
    setResult(null);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/admin/bulk-upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch {
      setUploadError('Network error — please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout
      title="Bulk Product Upload"
      description="Upload a CSV to create multiple products with variants in draft status. Images can be added later."
    >
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>

      {/* Instructions */}
      <div style={{ background: '#fff', border: '1px solid #e8e0d8', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#2c2c2c' }}>How it works</h3>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#555', lineHeight: 1.8 }}>
          <li>Download the CSV template and fill in your product data.</li>
          <li><strong>One row = one variant.</strong> Rows sharing the same <code>name</code> are grouped into a single product.</li>
          <li>Variant columns are shown in the template header and reflect the types currently active in the system — leave any blank if not applicable.</li>
          <li>Products are created in <strong>draft</strong> status. Upload images and publish them from the Products page.</li>
          <li>New variant values (e.g. a new colour) are created automatically. Variant <em>types</em> must already be enabled in the dictionary.</li>
        </ol>
        <a
          href="/api/admin/bulk-upload"
          download="product-upload-template.csv"
          style={{
            display: 'inline-block', marginTop: 14, padding: '8px 16px',
            background: '#f5f0eb', border: '1px solid #d4c9bc', borderRadius: 6,
            fontSize: 13, color: '#5c4a32', textDecoration: 'none', fontWeight: 500,
          }}
        >
          ⬇ Download Template
        </a>
      </div>

      {/* File input + upload button */}
      <div style={{ background: '#fff', border: '1px solid #e8e0d8', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#2c2c2c' }}>Upload CSV</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{
              flex: 1, minWidth: 200, padding: '8px 12px',
              border: '1px solid #d4c9bc', borderRadius: 6,
              fontSize: 13, background: '#faf8f6', color: '#444',
            }}
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              padding: '9px 22px', background: uploading ? '#ccc' : '#c19a6b',
              border: 'none', borderRadius: 6, color: '#fff', fontSize: 13,
              fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {uploading
              ? <><span style={{ display: 'inline-block', width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: 8, verticalAlign: 'middle' }}></span>Uploading…</>
              : 'Upload & Import'
            }
          </button>
        </div>
        {uploadError && (
          <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 13, color: '#dc2626' }}>
            {uploadError}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div style={{ background: '#fff', border: '1px solid #e8e0d8', borderRadius: 10, padding: '20px 24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#2c2c2c' }}>Import Results</h3>

          {/* Summary cards */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: result.errors.length > 0 ? 24 : 0 }}>
            <div style={{ padding: '14px 20px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#16a34a' }}>{result.created_products}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Products created</div>
            </div>
            <div style={{ padding: '14px 20px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#2563eb' }}>{result.created_variants}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Variants created</div>
            </div>
            {result.errors.length > 0 && (
              <div style={{ padding: '14px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#dc2626' }}>{result.errors.length}</div>
                <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Rows with errors</div>
              </div>
            )}
          </div>

          {/* Error table */}
          {result.errors.length > 0 && (
            <>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#444' }}>Error details</h4>
              <div style={{ border: '1px solid #e8e0d8', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: '#faf8f6' }}>
                      <th style={{ padding: '8px 14px', textAlign: 'left', borderBottom: '1px solid #e8e0d8', fontWeight: 600, color: '#555', width: 80 }}>Row</th>
                      <th style={{ padding: '8px 14px', textAlign: 'left', borderBottom: '1px solid #e8e0d8', fontWeight: 600, color: '#555' }}>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.errors.map((e, i) => (
                      <tr key={i} style={{ borderBottom: i < result.errors.length - 1 ? '1px solid #f0ebe4' : 'none' }}>
                        <td style={{ padding: '7px 14px', color: '#888', fontFamily: 'monospace' }}>Row {e.row}</td>
                        <td style={{ padding: '7px 14px', color: '#dc2626' }}>{e.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Link to draft products */}
          {result.created_products > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0ebe4' }}>
              <a
                href="/dashboard/products"
                style={{ fontSize: 13, color: '#c19a6b', textDecoration: 'none', fontWeight: 500 }}
              >
                → View products in dashboard
              </a>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default BulkUploadPage;
