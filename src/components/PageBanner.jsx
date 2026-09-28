import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export default function PageBanner({ badge, title, subtitle, breadcrumb, parentLink, parentLabel }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else if (parentLink) {
      navigate(parentLink);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="page-banner">
      <div className="container">
        {/* Navigation Bar with Back Button & Breadcrumbs */}
        <div className="page-banner-nav-row">
          <button
            type="button"
            onClick={handleGoBack}
            className="page-back-btn"
            aria-label="Go back to previous page"
            id="page-banner-back-btn"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>

          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <Home size={14} />
              <span>Home</span>
            </Link>
            {parentLink && parentLabel && (
              <>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <Link to={parentLink} className="breadcrumb-link">
                  {parentLabel}
                </Link>
              </>
            )}
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{breadcrumb || title}</span>
          </nav>
        </div>

        {badge && <div className="page-banner-badge">{badge}</div>}
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && <p className="page-banner-desc">{subtitle}</p>}
      </div>
    </div>
  );
}
