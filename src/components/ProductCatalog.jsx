import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import initialProducts from '../data/products.json';
import ProductHoverPopup from './ProductHoverPopup';

export default function ProductCatalog({ onSelectProduct, onQuickInquire }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState(initialProducts);

  // Active hover/tap popup state
  const [activePopupId, setActivePopupId] = useState(null);
  const [popupPositions, setPopupPositions] = useState({});

  const leaveTimerRef = useRef(null);
  const categories = ['All', 'Cattle Feed', 'Poultry Feed', 'Broiler & Hatchery', 'Poultry Concentrates'];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActivePopupId(null);
    if (cat === 'All') {
      setProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter(
        (p) => p.category.toLowerCase() === cat.toLowerCase()
      );
      setProducts(filtered);
    }
  };

  // Close popup when clicking outside anywhere on document
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.product-card')) {
        setActivePopupId(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Calculate dynamic responsive position (right, left, or bottom)
  const calculatePosition = (element) => {
    if (!element) return 'right';
    const rect = element.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Mobile / Tablet: always position as bottom overlay card
    if (screenWidth <= 860) {
      return 'bottom';
    }

    // Desktop: if not enough space on right (< 320px), reposition to left
    const spaceOnRight = screenWidth - rect.right;
    if (spaceOnRight < 330) {
      return 'left';
    }

    return 'right';
  };

  // Desktop Hover Handlers
  const handleMouseEnter = (productId, e) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    const cardEl = e.currentTarget.closest('.product-card');
    const pos = calculatePosition(cardEl);

    setPopupPositions((prev) => ({ ...prev, [productId]: pos }));
    setActivePopupId(productId);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setActivePopupId(null);
    }, 200);
  };

  const handlePopupMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  };

  // Touch / Click Handler for Mobile & Tablet
  const handleImageTap = (productId, e) => {
    e.stopPropagation();
    const cardEl = e.currentTarget.closest('.product-card');
    const pos = calculatePosition(cardEl);

    setPopupPositions((prev) => ({ ...prev, [productId]: pos }));
    setActivePopupId((prev) => (prev === productId ? null : productId));
  };

  // Keyboard accessibility (focus, space/enter, escape)
  const handleImageKeyDown = (productId, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageTap(productId, e);
    } else if (e.key === 'Escape') {
      setActivePopupId(null);
    }
  };

  return (
    <section className="section product-catalog-section" id="products">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green">Authentic Quality Formulation</div>
          <h2>Our Products & Feeds</h2>
          <p className="section-subtitle">
            Engineered with high biological value proteins, essential minerals, and vitamins for cattle milk yield and rapid broiler FCR.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="catalog-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {products.map((item) => {
            const isPopupOpen = activePopupId === item.id;
            const currentPos = popupPositions[item.id] || 'right';

            return (
              <div
                className="product-card"
                key={item.id}
                id={`product-${item.id}`}
                onMouseLeave={handleMouseLeave}
              >
                {/* Product Image Area with Hover & Tap Detection */}
                <div
                  className="product-img-wrap"
                  onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                  onClick={(e) => handleImageTap(item.id, e)}
                  onFocus={(e) => handleMouseEnter(item.id, e)}
                  onKeyDown={(e) => handleImageKeyDown(item.id, e)}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-expanded={isPopupOpen}
                  aria-label={`${item.name} image. Hover or tap to preview details`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="product-category-pill">{item.category}</span>

                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png';
                      e.target.style.maxHeight = '120px';
                    }}
                  />

                  {/* Subtle Quick Preview Indicator Pill */}
                  <div className="quick-preview-hint">
                    <Info size={12} />
                    <span>Quick Preview</span>
                  </div>
                </div>

                {/* Compact Product Details Hover / Tap Popup */}
                <div
                  onMouseEnter={handlePopupMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ProductHoverPopup
                    product={item}
                    isOpen={isPopupOpen}
                    position={currentPos}
                    onClose={() => setActivePopupId(null)}
                    onViewDetails={onSelectProduct}
                    onQuickInquire={onQuickInquire}
                  />
                </div>

                {/* Card Body */}
                <div className="product-body">
                  <div className="product-body-top">
                    <h4
                      className="product-title"
                      onClick={() => onSelectProduct(item)}
                      style={{ cursor: 'pointer' }}
                      title={`Click to view ${item.name} details`}
                    >
                      {item.name}
                    </h4>

                    {/* Packaging & Category Highlight Pill */}
                    <div className="product-card-info-pill">
                      <span>{item.sizes ? item.sizes[0] : '50 kg HDPE Bag'}</span>
                      <span className="info-dot">•</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
