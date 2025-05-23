import React, { useState } from 'react';
import { 
  Link, 
  Copy, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  BarChart3, 
  QrCode, 
  Lock, 
  Unlock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Settings
} from 'lucide-react';

const ManageUrls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({ password: '', confirmPassword: '' });

  // Mock data - replace with actual API data
  const [urls, setUrls] = useState([
    {
      id: 1,
      longUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
      shortUrl: 'Slink.com/abc123',
      title: 'Example Website',
      clicks: 1247,
      status: 'active',
      isPasswordProtected: true,
      hasExpiry: true,
      expiryDate: '2024-12-31',
      createdAt: '2024-01-15',
      lastClicked: '2 hours ago'
    },
    {
      id: 2,
      longUrl: 'https://github.com/username/repository',
      shortUrl: 'slink.com/gh789',
      title: 'GitHub Repository',
      clicks: 89,
      status: 'active',
      isPasswordProtected: false,
      hasExpiry: false,
      expiryDate: null,
      createdAt: '2024-02-10',
      lastClicked: '1 day ago'
    },
    {
      id: 3,
      longUrl: 'https://docs.google.com/presentation/d/1234567890',
      shortUrl: 'slink.com/ppt456',
      title: 'Project Presentation',
      clicks: 523,
      status: 'disabled',
      isPasswordProtected: true,
      hasExpiry: true,
      expiryDate: '2024-06-30',
      createdAt: '2024-01-20',
      lastClicked: '3 days ago'
    }
  ]);

  const handleEdit = (url) => {
    setSelectedUrl(url);
    setEditForm({
      longUrl: url.longUrl,
      title: url.title,
      hasExpiry: url.hasExpiry,
      expiryDate: url.expiryDate
    });
    setShowEditModal(true);
  };

  const handlePasswordChange = (url) => {
    setSelectedUrl(url);
    setPasswordForm({ password: '', confirmPassword: '' });
    setShowPasswordModal(true);
  };

  const handleToggleStatus = (id) => {
    setUrls(urls.map(url => 
      url.id === id 
        ? { ...url, status: url.status === 'active' ? 'disabled' : 'active' }
        : url
    ));
  };

  const handleDelete = (id) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const filteredUrls = urls.filter(url => {
    const matchesSearch = url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || url.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statsData = {
    totalClicks: [12, 19, 3, 5, 2, 3, 9, 15, 10, 8, 14, 7],
    dailyClicks: [5, 8, 12, 7, 9, 6, 15, 11, 8, 10],
    topCountries: [
      { country: 'United States', clicks: 45 },
      { country: 'United Kingdom', clicks: 32 },
      { country: 'Canada', clicks: 18 },
      { country: 'Germany', clicks: 12 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Fixed Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 sm:p-3 rounded-xl w-fit">
                <Link className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Manage URLs
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">Monitor, edit, and control your shortened links</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                />
              </div>

              {/* Filter and New URL Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-auto pl-9 pr-8 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none text-sm sm:text-base"
                  >
                    <option value="all">All URLs</option>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>

                <button className="px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <Plus className="w-4 h-4" />
                  <span>New URL</span>
                </button>
              </div>
            </div>
          </div>

          {/* URLs Grid */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up animation-delay-400">
            {filteredUrls.map((url, index) => (
              <div
                key={url.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex flex-col space-y-4">
                  {/* URL Info */}
                  <div className="space-y-3">
                    {/* Title and Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-lg font-semibold text-white break-words">{url.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {url.status === 'active' ? (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs">
                            <CheckCircle className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs">
                            <XCircle className="w-3 h-3" />
                            <span>Disabled</span>
                          </span>
                        )}
                        {url.isPasswordProtected && (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs">
                            <Shield className="w-3 h-3" />
                            <span>Protected</span>
                          </span>
                        )}
                        {url.hasExpiry && (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs">
                            <Clock className="w-3 h-3" />
                            <span className="hidden sm:inline">Expires {url.expiryDate}</span>
                            <span className="sm:hidden">Expires</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="text-gray-400 text-sm flex-shrink-0">Short URL:</span>
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="text-purple-400 font-mono text-sm break-all">{url.shortUrl}</span>
                          <button
                            onClick={() => copyToClipboard(`https://${url.shortUrl}`)}
                            className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                          >
                            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="text-gray-400 text-sm flex-shrink-0">Original:</span>
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="text-gray-300 text-sm break-all">{url.longUrl}</span>
                          <button className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0">
                            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{url.clicks} clicks</span>
                      </span>
                      <span className="hidden sm:inline">Created {url.createdAt}</span>
                      <span className="hidden sm:inline">Last clicked {url.lastClicked}</span>
                      <div className="sm:hidden space-y-1">
                        <div>Created {url.createdAt}</div>
                        <div>Last clicked {url.lastClicked}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleEdit(url)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowQrModal(true)}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200"
                      title="QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowStatsModal(true)}
                      className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
                      title="Statistics"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>

                    {url.isPasswordProtected && (
                      <button
                        onClick={() => handlePasswordChange(url)}
                        className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-200"
                        title="Change Password"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleToggleStatus(url.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        url.status === 'active'
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                      title={url.status === 'active' ? 'Disable' : 'Enable'}
                    >
                      {url.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleDelete(url.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUrls.length === 0 && (
            <div className="text-center py-12 animate-fade-in-up animation-delay-600">
              <div className="bg-white/5 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4">
                <Link className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No URLs found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Edit URL</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Long URL</label>
                <input
                  type="url"
                  value={editForm.longUrl}
                  onChange={(e) => setEditForm({...editForm, longUrl: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editForm.hasExpiry}
                  onChange={(e) => setEditForm({...editForm, hasExpiry: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm text-gray-300">Set expiry date</label>
              </div>
              {editForm.hasExpiry && (
                <input
                  type="date"
                  value={editForm.expiryDate}
                  onChange={(e) => setEditForm({...editForm, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm({...passwordForm, password: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-md text-center">
            <h3 className="text-xl font-semibold text-white mb-4">QR Code</h3>
            <div className="bg-white rounded-xl p-4 mb-4 inline-block">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded flex items-center justify-center">
                <QrCode className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">Scan to access your short URL</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Analytics & Stats</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">1,247</div>
                <div className="text-gray-400 text-sm">Total Clicks</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">89</div>
                <div className="text-gray-400 text-sm">Today</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">156</div>
                <div className="text-gray-400 text-sm">This Week</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Click Chart</h4>
                <div className="bg-white/5 rounded-xl p-4 h-32 flex items-end space-x-1 sm:space-x-2">
                  {statsData.totalClicks.map((clicks, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-600 to-pink-600 rounded-t flex-1"
                      style={{ height: `${(clicks / Math.max(...statsData.totalClicks)) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Top Countries</h4>
                <div className="space-y-2">
                  {statsData.topCountries.map((country, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <span className="text-white text-sm sm:text-base">{country.country}</span>
                      <span className="text-purple-400 font-semibold text-sm sm:text-base">{country.clicks} clicks</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}    {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ManageUrls;