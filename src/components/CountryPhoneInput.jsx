import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { COUNTRIES, DEFAULT_COUNTRY, getCountryByIso, getCountryByDial } from '../utils/countries.js';

/**
 * CountryFlag helper: Displays crisp national flag on all platforms (including Windows)
 * with graceful fallback to native emoji
 */
function CountryFlag({ country, size = 18 }) {
  const [imgError, setImgError] = useState(false);

  if (!country || !country.iso) {
    return <Globe size={size} className="cr-country-globe-icon" />;
  }

  if (imgError) {
    return (
      <span className="cr-country-flag-emoji" role="img" aria-label={country.name}>
        {country.flag}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${country.iso.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${country.iso.toLowerCase()}.png 2x`}
      width={22}
      height={15}
      alt={country.name}
      className="cr-country-flag-img"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

/**
 * Unified Country Phone Input Component for Urja Foods Careers
 * - Country calling code integrated inside the left of the single phone input box
 * - Default: India (🇮🇳 +91)
 * - Clean placeholder "Enter phone number" with NO numbers inside
 * - Click country code to open searchable dropdown with flags, country names, and calling codes
 * - Once selected, country code stays inside the input box, followed by the phone number
 */
export default function CountryPhoneInput({
  countryCode = '+91',
  countryIso = 'IN',
  phoneNumber = '',
  onCountryChange,
  onPhoneChange,
  error = null,
  disabled = false,
  required = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Active selected country (default: India)
  const currentCountry = useMemo(() => {
    return (
      getCountryByIso(countryIso) ||
      getCountryByDial(countryCode) ||
      DEFAULT_COUNTRY ||
      COUNTRIES[0]
    );
  }, [countryIso, countryCode]);

  // Filter countries by name, dial code, or ISO
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleCountrySelect = (country) => {
    if (onCountryChange) {
      onCountryChange({
        dial: country.dial,
        iso: country.iso,
        name: country.name,
      });
    }
    setIsOpen(false);
    setSearchQuery('');
    // Automatically focus phone input after selection
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 50);
  };

  const handlePhoneInputChange = (e) => {
    // Only allow digits and spaces
    const rawVal = e.target.value;
    const cleanDigits = rawVal.replace(/[^\d\s]/g, '');
    if (onPhoneChange) {
      onPhoneChange(cleanDigits);
    }
  };

  const handleBoxClick = (e) => {
    if (phoneInputRef.current && !e.target.closest('.cr-country-selector-btn') && !e.target.closest('.cr-country-dropdown-popover')) {
      phoneInputRef.current.focus();
    }
  };

  return (
    <div className="cr-field-group" ref={containerRef} style={{ position: 'relative' }}>
      <label className="cr-field-label" htmlFor="cr-phone-input">
        Phone Number {required && <span className="cr-req-star">*</span>}
      </label>

      {/* Unified Single Phone Input Box */}
      <div
        className={`cr-unified-phone-box cr-phone-input-group ${isFocused ? 'focused' : ''} ${isOpen ? 'open' : ''} ${error ? 'cr-error' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={handleBoxClick}
      >
        {/* Country Flag & Calling Code Trigger integrated inside left */}
        <button
          type="button"
          className="cr-country-selector-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) setIsOpen(!isOpen);
          }}
          disabled={disabled}
          title={`Selected: ${currentCountry.name} (${currentCountry.dial}). Click to search and change country.`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="cr-country-flag">
            <CountryFlag country={currentCountry} size={16} />
          </span>
          <span className="cr-country-code">
            {currentCountry.dial}
          </span>
          <ChevronDown
            size={13}
            className={`cr-country-chevron ${isOpen ? 'open' : ''}`}
          />
        </button>

        {/* Subtle vertical separator inside the unified input */}
        <div className="cr-phone-divider" />

        {/* Phone Number Input filling the rest of the same input box (NO numbers inside placeholder) */}
        <input
          id="cr-phone-input"
          type="tel"
          ref={phoneInputRef}
          className="cr-phone-number-input"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          autoComplete="tel-national"
        />
      </div>

      {/* Floating Searchable Country Dropdown Popover */}
      {isOpen && !disabled && (
        <div
          className="cr-country-dropdown-popover"
          role="listbox"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cr-country-search-wrap">
            <Search size={14} className="cr-country-search-icon" />
            <input
              type="text"
              ref={searchInputRef}
              className="cr-country-search-input"
              placeholder="Search country name, calling code, or ISO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="cr-country-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="cr-country-list-scroll">
            {filteredCountries.length === 0 ? (
              <div className="cr-country-empty">
                No countries found matching &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.iso === currentCountry.iso;
                return (
                  <button
                    key={c.iso}
                    type="button"
                    className={`cr-country-option-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleCountrySelect(c)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="cr-country-opt-flag">
                      <CountryFlag country={c} size={15} />
                    </span>
                    <span className="cr-country-opt-name">{c.name}</span>
                    <span className="cr-country-opt-dial">{c.dial}</span>
                    {isSelected && (
                      <Check size={14} className="cr-country-opt-check" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="cr-country-dropdown-footer">
            <span>Default: 🇮🇳 India (+91)</span>
            <span>{filteredCountries.length} countries</span>
          </div>
        </div>
      )}

      {error && <span className="cr-error-text">{error}</span>}
    </div>
  );
}
