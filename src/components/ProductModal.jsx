import React, { useEffect } from 'react';
import { X, Package } from 'lucide-react';

export default function ProductModal({ product, onClose, onInquire }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-small-popup" onClick={(e) => e.stopPropagation()}>
        {/* Compact Modal Header */}
        <div className="modal-header">
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.25rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
              {product.category}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {product.name}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close popup" id="modal-close-button">
            <X size={20} />
          </button>
        </div>

        {/* Compact Modal Body */}
        <div className="modal-body">
          {/* Framed Image */}
          <div className="modal-img-container">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png';
                e.target.style.maxHeight = '100px';
              }}
            />
          </div>

          {/* Description */}
          <p className="modal-desc">
            {product.description}
          </p>

          {/* Available Packaging Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="popup-sizes-wrap" style={{ marginBottom: '1.4rem' }}>
              <div className="popup-sizes-label">
                <Package size={12} />
                <span>Available Packaging:</span>
              </div>
              <div className="popup-sizes-chips">
                {product.sizes.map((size, idx) => (
                  <span key={idx} className="popup-size-chip">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions-row">
            <button
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={onClose}
              id="modal-cancel-btn"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
