import React, { useEffect } from 'react';
import { X, Package } from 'lucide-react';

export default function ProductHoverPopup({
  product,
  isOpen,
  position = 'right', // 'right', 'left', or 'bottom'
  onClose,
  onViewDetails,
  onQuickInquire,
}) {
  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !product) return null;

  return (
    <div
      className={`product-hover-popup pos-${position} ${isOpen ? 'show' : ''}`}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`${product.name} details`}
    >
      {/* Mobile close button */}
      <button
        className="popup-mobile-close"
        onClick={onClose}
        aria-label="Close preview"
        type="button"
      >
        <X size={16} />
      </button>

      {/* Top Header: Thumbnail + Title + Category */}
      <div className="popup-header-row">
        <img
          src={product.image}
          alt={product.name}
          className="popup-thumb"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png';
          }}
        />
        <div className="popup-title-meta">
          <span className="popup-cat-badge">{product.category}</span>
          <h5 className="popup-prod-name">{product.name}</h5>
        </div>
      </div>

      {/* Full Description Paragraph */}
      <p className="popup-full-desc">
        {product.description}
      </p>

      {/* Available Packaging Sizes if present */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="popup-sizes-wrap">
          <div className="popup-sizes-label">
            <Package size={12} />
            <span>Packaging:</span>
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
    </div>
  );
}
