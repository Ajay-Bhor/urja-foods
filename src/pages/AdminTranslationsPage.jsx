import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Search,
  Save,
  Plus,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  Database,
  Layers,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import '../styles/admin-translations.css';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'navigation', label: 'Navigation Menu' },
  { id: 'topbar', label: 'Topbar & Contact Info' },
  { id: 'hero', label: 'Hero Banner' },
  { id: 'welcome', label: 'Welcome & About Section' },
  { id: 'about', label: 'About Pages' },
  { id: 'businesses', label: 'Businesses & Sectors' },
  { id: 'why_choose_urja', label: 'Why Choose Urja' },
  { id: 'sustainability', label: 'Sustainability & CSR' },
  { id: 'products', label: 'Products & Packaging' },
  { id: 'contact', label: 'Contact & Location' },
  { id: 'inquiry', label: 'Inquiry Form' },
  { id: 'careers', label: 'Careers & Recruitment' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'testimonials', label: 'Testimonials & Reviews' },
  { id: 'footer', label: 'Footer & Links' },
  { id: 'common', label: 'Common Buttons & Labels' },
];

export default function AdminTranslationsPage() {
  const { language, setLanguage, supportedLanguages, refreshTranslations } = useLanguage();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('mysql');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedViewLang, setSelectedViewLang] = useState('all'); // 'all', 'en', 'mr', 'hi'

  // Edited items map: { [key_lang]: newValue }
  const [edits, setEdits] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New translation modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newEn, setNewEn] = useState('');
  const [newMr, setNewMr] = useState('');
  const [newHi, setNewHi] = useState('');

  // Fetch translations list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/translations/list');
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setSource(data.source || 'mysql');
      }
    } catch (err) {
      console.error('Failed to load translations list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Group items by translation key
  const groupedKeys = useMemo(() => {
    const map = new Map();
    items.forEach((item) => {
      if (!map.has(item.trans_key)) {
        map.set(item.trans_key, {
          key: item.trans_key,
          category: item.category || 'general',
          en: '',
          mr: '',
          hi: '',
        });
      }
      const entry = map.get(item.trans_key);
      if (item.lang_code === 'en') entry.en = item.trans_value;
      if (item.lang_code === 'mr') entry.mr = item.trans_value;
      if (item.lang_code === 'hi') entry.hi = item.trans_value;
      if (item.category && item.category !== 'general') entry.category = item.category;
    });
    return Array.from(map.values());
  }, [items]);

  // Filter keys by category and search
  const filteredKeys = useMemo(() => {
    return groupedKeys.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'common' && (item.category === 'general' || item.key.startsWith('common') || item.key.startsWith('lang')));

      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.key.toLowerCase().includes(term) ||
        (item.en && item.en.toLowerCase().includes(term)) ||
        (item.mr && item.mr.toLowerCase().includes(term)) ||
        (item.hi && item.hi.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [groupedKeys, selectedCategory, search]);

  // Handle cell edit
  const handleCellChange = (transKey, langCode, value) => {
    const editKey = `${transKey}:${langCode}`;
    setEdits((prev) => ({
      ...prev,
      [editKey]: value,
    }));
  };

  // Get current value (edited or original)
  const getValue = (item, langCode) => {
    const editKey = `${item.key}:${langCode}`;
    if (edits[editKey] !== undefined) {
      return edits[editKey];
    }
    return item[langCode] || '';
  };

  const isCellModified = (item, langCode) => {
    const editKey = `${item.key}:${langCode}`;
    return edits[editKey] !== undefined && edits[editKey] !== (item[langCode] || '');
  };

  const unsavedCount = Object.keys(edits).length;

  // Save all modified translations
  const handleSaveAll = async () => {
    if (unsavedCount === 0) return;

    try {
      setIsSaving(true);
      const batchItems = [];

      for (const [editKey, value] of Object.entries(edits)) {
        const [transKey, langCode] = editKey.split(':');
        const original = groupedKeys.find((k) => k.key === transKey);
        batchItems.push({
          lang_code: langCode,
          trans_key: transKey,
          trans_value: value,
          category: original ? original.category : 'general',
        });
      }

      const res = await fetch('/api/translations/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: batchItems }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Saved ${batchItems.length} translations successfully!`);
        setEdits({});
        await fetchList();
        await refreshTranslations();
      } else {
        alert('Error saving translations: ' + data.message);
      }
    } catch (err) {
      alert('Network error while saving translations: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Add new translation key
  const handleAddNew = async (e) => {
    e.preventDefault();
    if (!newKey.trim()) {
      alert('Please enter a unique translation key name.');
      return;
    }

    try {
      setIsSaving(true);
      const batchItems = [
        { lang_code: 'en', trans_key: newKey.trim(), trans_value: newEn, category: newCategory },
        { lang_code: 'mr', trans_key: newKey.trim(), trans_value: newMr, category: newCategory },
        { lang_code: 'hi', trans_key: newKey.trim(), trans_value: newHi, category: newCategory },
      ];

      const res = await fetch('/api/translations/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: batchItems }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Translation key "${newKey}" created successfully!`);
        setIsAddModalOpen(false);
        setNewKey('');
        setNewEn('');
        setNewMr('');
        setNewHi('');
        await fetchList();
        await refreshTranslations();
      }
    } catch (err) {
      alert('Error creating translation: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-trans-page">
      <div className="admin-trans-container">
        {/* Header & Controls */}
        <div className="admin-trans-header">
          <div className="admin-trans-top-row">
            <div className="admin-trans-title-area">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <Link to="/" className="admin-btn admin-btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  <ArrowLeft size={14} /> Back to Website
                </Link>
                <span className="admin-badge-db">
                  <Database size={12} />
                  Database: {source === 'mysql' ? 'MySQL Connected' : 'JSON Sync Fallback'}
                </span>
              </div>
              <h1>
                <Globe size={24} style={{ color: '#173b24' }} />
                Urja Foods Native Multilingual CMS
              </h1>
              <p>
                Manage, add and edit native translations for English, Marathi (मराठी) and Hindi (हिन्दी).
                All saved edits persist permanently in the database and reflect across the website.
              </p>
            </div>

            <div className="admin-trans-header-actions">
              {/* Live Preview Language Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#55725f' }}>Live Preview:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="admin-select"
                  style={{ padding: '8px 12px', fontWeight: 600 }}
                >
                  {supportedLanguages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label} ({l.shortLabel})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={() => {
                  fetchList();
                  refreshTranslations();
                  showToast('Refreshed translations from database');
                }}
                title="Refresh from database"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={16} />
                Add Translation Key
              </button>

              <button
                type="button"
                className={`admin-btn ${unsavedCount > 0 ? 'admin-btn-success' : 'admin-btn-outline'}`}
                onClick={handleSaveAll}
                disabled={unsavedCount === 0 || isSaving}
                style={{ opacity: unsavedCount === 0 ? 0.6 : 1 }}
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : `Save Changes (${unsavedCount})`}
              </button>
            </div>
          </div>

          {/* Quick Statistics Bar */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><Layers size={20} /></div>
              <div className="admin-stat-info">
                <strong>{groupedKeys.length}</strong>
                <span>Total Translation Keys</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon"><FileText size={20} /></div>
              <div className="admin-stat-info">
                <strong>{groupedKeys.filter((k) => k.en).length}</strong>
                <span>English (EN - Default)</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon"><FileText size={20} /></div>
              <div className="admin-stat-info">
                <strong>{groupedKeys.filter((k) => k.mr).length}</strong>
                <span>Marathi (MR - मराठी)</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon"><FileText size={20} /></div>
              <div className="admin-stat-info">
                <strong>{groupedKeys.filter((k) => k.hi).length}</strong>
                <span>Hindi (HI - हिन्दी)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-controls-top">
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search key name or translated text..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-search-input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="admin-filter-group">
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#55725f' }}>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="admin-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Language View Tabs */}
          <div className="admin-lang-tabs">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#55725f', display: 'flex', alignItems: 'center' }}>
              Columns:
            </span>
            <button
              type="button"
              className={`admin-lang-tab ${selectedViewLang === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedViewLang('all')}
            >
              All Languages (EN, MR, HI)
            </button>
            <button
              type="button"
              className={`admin-lang-tab ${selectedViewLang === 'en' ? 'active' : ''}`}
              onClick={() => setSelectedViewLang('en')}
            >
              English Only
            </button>
            <button
              type="button"
              className={`admin-lang-tab ${selectedViewLang === 'mr' ? 'active' : ''}`}
              onClick={() => setSelectedViewLang('mr')}
            >
              मराठी (Marathi)
            </button>
            <button
              type="button"
              className={`admin-lang-tab ${selectedViewLang === 'hi' ? 'active' : ''}`}
              onClick={() => setSelectedViewLang('hi')}
            >
              हिन्दी (Hindi)
            </button>

            {unsavedCount > 0 && (
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#c05621', fontWeight: 600 }}>
                <AlertCircle size={15} />
                {unsavedCount} unsaved change{unsavedCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Translations Table */}
        <div className="admin-table-container">
          <div className="admin-table-wrapper">
            <table className="admin-trans-table">
              <thead>
                <tr>
                  <th style={{ width: '220px' }}>Key &amp; Category</th>
                  {(selectedViewLang === 'all' || selectedViewLang === 'en') && (
                    <th style={{ width: '32%' }}>English (Default)</th>
                  )}
                  {(selectedViewLang === 'all' || selectedViewLang === 'mr') && (
                    <th style={{ width: '32%' }}>Marathi (मराठी)</th>
                  )}
                  {(selectedViewLang === 'all' || selectedViewLang === 'hi') && (
                    <th style={{ width: '32%' }}>Hindi (हिन्दी)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#637d6c' }}>
                      <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 10px' }} />
                      Loading translations from database...
                    </td>
                  </tr>
                ) : filteredKeys.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#637d6c' }}>
                      No translations matching "{search}" in category "{selectedCategory}".
                    </td>
                  </tr>
                ) : (
                  filteredKeys.map((item) => (
                    <tr key={item.key}>
                      <td className="admin-key-cell">
                        <div className="admin-key-name">{item.key}</div>
                        <span className="admin-key-cat">{item.category}</span>
                      </td>

                      {(selectedViewLang === 'all' || selectedViewLang === 'en') && (
                        <td>
                          <textarea
                            className={`admin-input-textarea ${isCellModified(item, 'en') ? 'modified' : ''}`}
                            value={getValue(item, 'en')}
                            onChange={(e) => handleCellChange(item.key, 'en', e.target.value)}
                            placeholder="English content..."
                          />
                        </td>
                      )}

                      {(selectedViewLang === 'all' || selectedViewLang === 'mr') && (
                        <td>
                          <textarea
                            className={`admin-input-textarea ${isCellModified(item, 'mr') ? 'modified' : ''}`}
                            value={getValue(item, 'mr')}
                            onChange={(e) => handleCellChange(item.key, 'mr', e.target.value)}
                            placeholder="मराठी मजकूर..."
                          />
                        </td>
                      )}

                      {(selectedViewLang === 'all' || selectedViewLang === 'hi') && (
                        <td>
                          <textarea
                            className={`admin-input-textarea ${isCellModified(item, 'hi') ? 'modified' : ''}`}
                            value={getValue(item, 'hi')}
                            onChange={(e) => handleCellChange(item.key, 'hi', e.target.value)}
                            placeholder="हिन्दी सामग्री..."
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Key Modal */}
        {isAddModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Add New Translation Key</h3>
                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddNew}>
                <div className="admin-modal-body">
                  <div className="admin-form-group">
                    <label>Translation Key (camelCase, e.g. heroSpecialOffer)</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. promoBannerTitle"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Category</label>
                    <select
                      className="admin-select"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>English Content (Default)</label>
                    <textarea
                      className="admin-input-textarea"
                      placeholder="Enter English content..."
                      rows={2}
                      value={newEn}
                      onChange={(e) => setNewEn(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Marathi Content (मराठी)</label>
                    <textarea
                      className="admin-input-textarea"
                      placeholder="मराठी मजकूर प्रविष्ट करा..."
                      rows={2}
                      value={newMr}
                      onChange={(e) => setNewMr(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Hindi Content (हिन्दी)</label>
                    <textarea
                      className="admin-input-textarea"
                      placeholder="हिन्दी सामग्री दर्ज करें..."
                      rows={2}
                      value={newHi}
                      onChange={(e) => setNewHi(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-primary"
                    disabled={isSaving}
                  >
                    <Plus size={15} />
                    {isSaving ? 'Creating...' : 'Create Translation Key'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="admin-toast">
            <CheckCircle size={18} style={{ color: '#4ade80' }} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
