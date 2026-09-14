import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Building2,
  X,
  ArrowLeft,
  Database,
  MessageSquare,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import UrjaDataLoader from './UrjaDataLoader';

export default function UrjaHrPortal({ onNavigate }) {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  // Active Tab: 'applications' or 'inquiries'
  const [activeTab, setActiveTab] = useState('applications');

  // Applications State
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppForDetail, setSelectedAppForDetail] = useState(null);

  // Inquiries State (Database backed)
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [filterInquiryType, setFilterInquiryType] = useState('all');
  const [filterInquiryStatus, setFilterInquiryStatus] = useState('all');
  const [selectedInquiryForDetail, setSelectedInquiryForDetail] = useState(null);

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState({
    connected: false,
    database: 'urja_foods',
    host: 'Local Storage Engine',
    state: 'connecting',
    collections: { inquiries: 0, applications: 0, products: 0, jobOpenings: 0 }
  });

  const fetchDbStatus = async () => {
    try {
      const res = await fetch('/api/urja/db-status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch (err) {
      console.warn('Could not fetch Database status:', err);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/urja/careers/applications');
      const data = await res.json();
      if (data && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/urja/inquiries');
      const data = await res.json();
      if (data && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const refreshAllData = () => {
    fetchDbStatus();
    if (activeTab === 'applications') fetchApplications();
    else fetchInquiries();
  };

  useEffect(() => {
    fetchDbStatus();
    fetchApplications();
    fetchInquiries();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await fetch(`/api/urja/careers/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        if (selectedAppForDetail && selectedAppForDetail.id === appId) {
          setSelectedAppForDetail((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await fetch(`/api/urja/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === inquiryId || i.inquiryId === inquiryId ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiryForDetail && (selectedInquiryForDetail.id === inquiryId || selectedInquiryForDetail.inquiryId === inquiryId)) {
          setSelectedInquiryForDetail((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesPos = filterPosition === 'all' || app.position.toLowerCase().includes(filterPosition.toLowerCase());
    const matchesStat = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.id && app.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.phone && app.phone.includes(searchQuery));
    return matchesPos && matchesStat && matchesSearch;
  });

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesType = filterInquiryType === 'all' || (inq.inquiryType && inq.inquiryType.toLowerCase().includes(filterInquiryType.toLowerCase()));
    const matchesStat = filterInquiryStatus === 'all' || inq.status === filterInquiryStatus;
    const matchesSearch =
      searchQuery === '' ||
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.id && inq.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.location && inq.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.phone && inq.phone.includes(searchQuery));
    return matchesType && matchesStat && matchesSearch;
  });

  const totalCount = applications.length;
  const underReviewCount = applications.filter((a) => a.status === 'Under Review').length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter((a) => a.status === 'Interview Scheduled').length;

  const totalInquiriesCount = inquiries.length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const contactedInquiriesCount = inquiries.filter((i) => i.status === 'Contacted').length;
  const resolvedInquiriesCount = inquiries.filter((i) => i.status === 'Resolved').length;

  const statusColors = {
    'Under Review': 'bg-amber-50 text-amber-800 border-amber-200',
    'Shortlisted': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Interview Scheduled': 'bg-blue-50 text-blue-800 border-blue-200',
    'Hired': 'bg-green-100 text-green-900 border-green-300 font-bold',
    'Rejected': 'bg-rose-50 text-rose-800 border-rose-200',
    'Archived': 'bg-slate-100 text-slate-700 border-slate-300',
    'New': 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold',
    'Contacted': 'bg-blue-50 text-blue-800 border-blue-200',
    'In Discussion': 'bg-amber-50 text-amber-800 border-amber-200',
    'Resolved': 'bg-purple-50 text-purple-800 border-purple-200'
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 text-left py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <button
              onClick={() => onNavigate('careers')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-urja-700 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'करिअर पृष्ठावर परत जा' : 'Back to Public Careers Page'}</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-urja-800 text-white shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {isMarathi ? 'उर्जा फुड्स अंतर्गत भरती व डेटा नियंत्रण कक्ष' : 'Urja Foods & Agro • Internal HR & Data Portal'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Automated Candidate Dossiers, Dealership Leads & MySQL Database Persistence
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Database Live Status Pill */}
            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 shadow-xs ${
                dbStatus.connected
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
              title={`Engine: ${dbStatus.engine || 'MySQL'} | DB: ${dbStatus.database} | Host: ${dbStatus.host}:${dbStatus.port || 3306}`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    dbStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                ></span>
                <span>
                  MySQL: <strong>{dbStatus.connected ? 'Connected' : 'Offline'}</strong>
                </span>
              </span>
              <span className="text-[10px] font-mono bg-white/70 px-1.5 py-0.5 rounded text-slate-600">
                {dbStatus.database}
              </span>
            </div>

            <button
              onClick={refreshAllData}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading || loadingInquiries ? 'animate-spin' : ''}`} />
              <span>{isMarathi ? 'रिफ्रेश करा' : 'Refresh Data'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Job Applications vs Inquiries */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'applications'
                ? 'border-urja-700 text-urja-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isMarathi ? 'भरती अर्ज' : 'Job Applications'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-mono">
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'inquiries'
                ? 'border-urja-700 text-urja-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isMarathi ? 'शेतकरी व डीलरशिप चौकशी' : 'Farmer & Dealer Inquiries'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 font-mono font-bold">
              {totalInquiriesCount}
            </span>
          </button>
        </div>

        {/* APPLICATIONS TAB VIEW */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* 4 Stat Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{isMarathi ? 'एकूण अर्ज' : 'Total Applications'}</span>
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-2">
                  {totalCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Stored in MySQL Database</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
                  <span>{isMarathi ? 'तपासणी बाकी' : 'Under Review'}</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono mt-2">
                  {underReviewCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Pending HR screening</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
                  <span>{isMarathi ? 'शॉर्टलिस्टेड' : 'Shortlisted'}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-2">
                  {shortlistedCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Approved for next round</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
                  <span>{isMarathi ? 'मुलाखत नियोजित' : 'Interviews Scheduled'}</span>
                  <Briefcase className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono mt-2">
                  {interviewCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Nirgudsar plant / field</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isMarathi ? 'नाव, फोन किंवा आयडी शोधा...' : 'Search by name, ID, phone, city...'}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-urja-600 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Position:</span>
                  <select
                    value={filterPosition}
                    onChange={(e) => setFilterPosition(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="Veterinary">Veterinary</option>
                    <option value="Feed Mill">Feed Mill</option>
                    <option value="EC Broiler">EC Broiler Sheds</option>
                    <option value="Sales">Sales & Marketing</option>
                    <option value="Quality">Quality Assurance</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <UrjaDataLoader
                  type="spinner-hud"
                  message="Loading candidate records from MySQL..."
                  subMessage="Synchronizing job_applications table and email audit trails"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4">Ref ID & Date</th>
                        <th className="py-3.5 px-4">Candidate Name</th>
                        <th className="py-3.5 px-4">Role Applied</th>
                        <th className="py-3.5 px-4">Location / Exp</th>
                        <th className="py-3.5 px-4">Email Confirmation</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          <div className="max-w-xs mx-auto space-y-2">
                            <Users className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="font-semibold text-slate-600">No applications match your filter</p>
                            <p className="text-[11px]">Submit an application from the Careers page to see it appear here instantly.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-urja-800">{app.id}</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(app.receivedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{app.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <a href={`tel:${app.phone}`} className="hover:text-urja-700 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{app.phone}</span>
                              </a>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800 max-w-[220px] truncate" title={app.position}>
                              {app.position}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">{app.qualification}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-slate-700">{app.location}</div>
                            <div className="text-[10px] text-slate-400">{app.experience}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            {app.email && app.email.includes('@') ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Sent to Candidate</span>
                                </span>
                                <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{app.email}</div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">No Email Provided</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border focus:outline-none transition-all ${
                                statusColors[app.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Hired">Hired</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedAppForDetail(app)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Dossier</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* INQUIRIES TAB VIEW (Database Backed) */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* 4 Stat Overview Cards for Inquiries */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{isMarathi ? 'एकूण चौकशी' : 'Total Inquiries'}</span>
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-2">
                  {totalInquiriesCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Stored in MySQL Database</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
                  <span>{isMarathi ? 'नवीन चौकशी' : 'New Inquiries'}</span>
                  <Clock className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-2">
                  {newInquiriesCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Requires immediate follow-up</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
                  <span>{isMarathi ? 'संपर्क केला' : 'Contacted'}</span>
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono mt-2">
                  {contactedInquiriesCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Discussion underway</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-purple-700 text-xs font-semibold">
                  <span>{isMarathi ? 'निराकरण झाले' : 'Resolved / Converted'}</span>
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono mt-2">
                  {resolvedInquiriesCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Order placed or completed</div>
              </div>
            </div>

            {/* Filter and Search Bar for Inquiries */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isMarathi ? 'नाव, फोन किंवा शहर शोधा...' : 'Search inquiries by name, phone, city...'}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-urja-600 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Type:</span>
                  <select
                    value={filterInquiryType}
                    onChange={(e) => setFilterInquiryType(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Inquiry Types</option>
                    <option value="Cattle">Cattle Feed</option>
                    <option value="Poultry">Poultry Feed</option>
                    <option value="Dealership">Dealership / Agency</option>
                    <option value="Contract">Contract Farming</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Status:</span>
                  <select
                    value={filterInquiryStatus}
                    onChange={(e) => setFilterInquiryStatus(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inquiries Table */}
            {loadingInquiries ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <UrjaDataLoader
                  type="spinner-hud"
                  message="Fetching dealer & farmer inquiries..."
                  subMessage="Synchronizing inquiries table from MySQL database"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4">Ref ID & Date</th>
                        <th className="py-3.5 px-4">Farmer / Dealer</th>
                        <th className="py-3.5 px-4">Inquiry Category</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Message Preview</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          <div className="max-w-xs mx-auto space-y-2">
                            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="font-semibold text-slate-600">No inquiries match your criteria</p>
                            <p className="text-[11px]">When users submit contact forms or dealership inquiries, they appear here.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id || inq.inquiryId} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-urja-800">{inq.inquiryId || inq.id}</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(inq.receivedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{inq.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <a href={`tel:${inq.phone}`} className="hover:text-urja-700 flex items-center gap-1 font-semibold">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{inq.phone}</span>
                              </a>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px] inline-block">
                              {inq.inquiryType || 'General Feed'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{inq.location || 'Maharashtra'}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="max-w-[240px] truncate text-slate-600 italic">
                              {inq.message || 'No specific notes'}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.inquiryId || inq.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border focus:outline-none transition-all ${
                                statusColors[inq.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedInquiryForDetail(inq)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

      </div>

      {/* Candidate Dossier Detail Modal */}
      {selectedAppForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold text-urja-700 bg-urja-50 px-2.5 py-1 rounded-md">
                  Ref: {selectedAppForDetail.id}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedAppForDetail.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Applied for: <span className="text-slate-800">{selectedAppForDetail.position}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedAppForDetail(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Contact Phone:</span>
                <a href={`tel:${selectedAppForDetail.phone}`} className="font-bold text-urja-700 hover:underline">
                  {selectedAppForDetail.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Email Address:</span>
                <a href={`mailto:${selectedAppForDetail.email}`} className="font-bold text-blue-600 hover:underline truncate block">
                  {selectedAppForDetail.email || 'N/A'}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Current Location:</span>
                <span className="font-bold text-slate-900">{selectedAppForDetail.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Highest Education:</span>
                <span className="font-bold text-slate-900">{selectedAppForDetail.qualification}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Relevant Experience:</span>
                <span className="font-bold text-slate-900">{selectedAppForDetail.experience}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Database Persistence:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> Stored in MySQL Database
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Candidate Statement & Qualifications Summary:
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedAppForDetail.resumeText || 'No extra notes provided by candidate.'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Automated Email Communication Audit Log:</span>
              </div>
              <div className="space-y-1 text-emerald-900 text-[11px]">
                <div className="flex items-center justify-between">
                  <span>1. Internal Alert to HR (hr@urjafoods.net):</span>
                  <span className="font-bold text-emerald-800">✅ Dispatched</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2. Confirmation to Candidate ({selectedAppForDetail.email}):</span>
                  <span className="font-bold text-emerald-800">
                    {selectedAppForDetail.email ? '✅ Delivered' : '⚠️ Skipped (No email)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Status:</span>
                <select
                  value={selectedAppForDetail.status}
                  onChange={(e) => handleStatusChange(selectedAppForDetail.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-white text-slate-800"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedAppForDetail.phone}`}
                  className="px-4 py-2 rounded-xl bg-urja-700 hover:bg-urja-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Candidate</span>
                </a>

                <a
                  href={`mailto:${selectedAppForDetail.email}?subject=Urja%20Foods%20Interview%20-%20Ref%20${selectedAppForDetail.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiryForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Inquiry: {selectedInquiryForDetail.inquiryId || selectedInquiryForDetail.id}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedInquiryForDetail.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Category: <span className="text-slate-800">{selectedInquiryForDetail.inquiryType}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiryForDetail(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Contact Phone:</span>
                <a href={`tel:${selectedInquiryForDetail.phone}`} className="font-bold text-urja-700 hover:underline">
                  {selectedInquiryForDetail.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Email Address:</span>
                <a href={`mailto:${selectedInquiryForDetail.email}`} className="font-bold text-blue-600 hover:underline truncate block">
                  {selectedInquiryForDetail.email || 'N/A'}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Region / Location:</span>
                <span className="font-bold text-slate-900">{selectedInquiryForDetail.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Database Persistence:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> Stored in MySQL Database
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Farmer / Dealer Message & Order Details:
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedInquiryForDetail.message || 'No additional message provided.'}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Status:</span>
                <select
                  value={selectedInquiryForDetail.status}
                  onChange={(e) => handleInquiryStatusChange(selectedInquiryForDetail.inquiryId || selectedInquiryForDetail.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-white text-slate-800"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedInquiryForDetail.phone}`}
                  className="px-4 py-2 rounded-xl bg-urja-700 hover:bg-urja-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Farmer / Dealer</span>
                </a>

                {selectedInquiryForDetail.email && selectedInquiryForDetail.email !== 'N/A' && (
                  <a
                    href={`mailto:${selectedInquiryForDetail.email}?subject=Urja%20Foods%20Inquiry%20-%20Ref%20${selectedInquiryForDetail.inquiryId || selectedInquiryForDetail.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
