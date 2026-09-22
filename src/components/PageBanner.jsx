import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageBanner({ badge, title, subtitle, breadcrumb }) {
  return (
    <div className="page-banner">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{breadcrumb || title}</span>
        </nav>

        {badge && <div className="page-banner-badge">{badge}</div>}
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && <p className="page-banner-desc">{subtitle}</p>}
      </div>
    </div>
  );
}
