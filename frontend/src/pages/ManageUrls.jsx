import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Copy,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  BarChart3,
  QrCode,
  Lock,
  Plus,
  Search,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUrlData } from '../redux/urlSlice.js';
import LoadingOverlay from '../components/LoadingOverlay';
import { downloadImage } from '../utils/downloadImage';
import { Link, useNavigate } from "react-router-dom"
import Notification from '../components/Notification.jsx';
import validator from "validator"
import DeleteConfirmationModal from '../components/Modals/DeleteConfirmationModal.jsx';
import ToggleStatusModal from '../components/Modals/ToggleStatusModal.jsx';
import EditUrlModal from '../components/Modals/EditUrlModal.jsx';
import ChangePasswordModal from '../components/Modals/ChangePasswordModal.jsx';
import QrCodeModal from '../components/Modals/QrCodeModal.jsx';

const ManageUrls = () => {
  const dispatch = useDispatch();
  const urlData = useSelector(store => store.url.urls)
  const isLoading = useSelector(store => store.url.isLoading);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/`, { withCredentials: true });
        dispatch(setUrlData(data.urls))
        dispatch(setLoading(false))
      }
      catch (err) {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000)
        dispatch(setLoading(false))
        setErrorMessage(err.response?.data?.message || err.message || "Please login")
      }
    }
    if (urlData.length == 0) {
      fetchData()
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedUrl, setSelectedUrl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [showQrModal, setShowQrModal] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    originalUrl: '',
    shortUrl: '',
    expiresAt: '',
    expiresTime: '',
    minDate: '',
    minTime: ''
  });
  const [passwordForm, setPasswordForm] = useState({ password: ' ', confirmPassword: ' ' });
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEdit = (url) => {
    setSelectedUrl(url);
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const minDate = minDateTime.toISOString().split('T')[0];
    const minTime = minDateTime.toTimeString().split(' ')[0].slice(0, 5);


    setEditForm({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      expiresAt: url.expiresAt ? url.expiresAt.split('T')[0] : minDate,
      expiresTime: url.expiresAt ? url.expiresAt.split('T')[1].substring(0, 5) : minTime,
      minDate: minDate,
      minTime: minTime
    });
    setShowEditModal(true);
  };

  const makeApiCallToSaveEditChanges = async () => {
    const selectedDateTime = new Date(`${editForm.expiresAt}T${editForm.expiresTime}`);
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

    if (selectedDateTime < minDateTime) {
      alert('Expiry date and time must be at least 1 hour from now');
      return;
    }
    if (!validator.isURL(editForm.originalUrl)) {
      setShowEditModal(false)
      setErrorMessage("Invalid URL")
      return
    }
    try {
      await axios.put(`${API_URL}/updateUrlAndExpiry/${selectedUrl._id}`, {
        newLongUrl: editForm.originalUrl,
        newExpiry: selectedDateTime
      }, {
        withCredentials: true
      });


      const updatedData = urlData.map((url) => {
        if (url._id.toString() === selectedUrl._id.toString()) {
          return {
            ...url,
            originalUrl: editForm.originalUrl,
            expiresAt: selectedDateTime.toISOString() // convert Date to string
          };
        }
        return url;
      });

      dispatch(setUrlData(updatedData));
      setShowEditModal(false);
      setSuccessMessage("Update Successfull")
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
    }
  };

  const handlePasswordChange = (url) => {
    setSelectedUrl(url);
    setPasswordForm({ password: '', confirmPassword: '' });
    setShowPasswordModal(true);
  };

  const makeApiCallToHandlePasswordChange = async () => {
    try {
      if (passwordForm.password !== passwordForm.confirmPassword) {
        setErrorMessage("Passwords do not match");
        setShowPasswordModal(false)
        return
      }
      const response = await axios.put(`${API_URL}/updatePassword/${selectedUrl._id}`, {
        newPassword: passwordForm.password.trim() || "",
        confirmPassword: passwordForm.confirmPassword.trim() || ""
      }, {
        withCredentials: true,
      })
      const updatedData = urlData.map((url) => {
        if (url._id.toString() === selectedUrl._id.toString()) {
          return {
            ...url,
            isPasswordProtected: passwordForm.password.trim() ? true : false
          };
        }
        return url;
      });

      dispatch(setUrlData(updatedData));
      setShowPasswordModal(false)
      setSuccessMessage(response.data.message);
    }
    catch (err) {
      setShowPasswordModal(false)
      setErrorMessage(err.response?.data?.message || err.message);
    }
  }

  const makeApiCallToDeleteLink = async () => {
    try {

      const response = await axios.delete(`${API_URL}/delete/${selectedUrl._id}`, {}, {
        withCredentials: true,
      })

      const updatedData = urlData.filter((url) => url._id.toString() !== selectedUrl._id.toString());

      dispatch(setUrlData(updatedData));
      setShowDeleteModal(false)
      setSuccessMessage(response.data.message);
    }
    catch (err) {
      setShowDeleteModal(false)
      setErrorMessage(err.response?.data?.message || err.message);
    }

  }

  const getShortUrlPath = (fullUrl) => {
    return fullUrl.replace('https://', '').replace('http://', '');
  };

  const filteredUrls = urlData.filter(url => {
    const matchesSearch = url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) || (url?.title && url.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const makeApiCallToChangeStatus = async () => {
    try {
      const response = await axios.put(`${API_URL}/changeActivationStatus/${selectedUrl._id}`)
      const updatedData = urlData.map((url) => {
        if (url._id.toString() === selectedUrl._id.toString()) {
          return {
            ...url,
            isActive: !url.isActive
          };
        }
        return url;
      });

      dispatch(setUrlData(updatedData));
      setShowStatusModal(false)
      setSuccessMessage(response.data.message);
    } catch (err) {
      setShowStatusModal(false)
      setErrorMessage(err.response?.data?.message || err.message);
    }
  }

  const handleUrlCopy = async (url) => {
    try {
      setCopied(true)
      await navigator.clipboard.writeText(url.shortUrl);
      setSuccessMessage("URL copied to clipboard");
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err);
      setErrorMessage("Failed to copy URL");
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {isLoading ? <LoadingOverlay isLoading={isLoading} message={"Please wait while getting logged in ."} /> : ""}
      {errorMessage && <Notification messageType="error" message={errorMessage} onClose={() => setErrorMessage('')} />}
      {successMessage && <Notification messageType="success" message={successMessage} onClose={() => setSuccessMessage('')} />}
      <div>
        <div className="relative z- px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-row   items-center justify-between mb-8 animate-fade-in-up space-y-0 text-white">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link to="/">
                  <button className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </Link>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Manage URLs
                  </h1>
                  <p className="text-gray-400 hidden sm:block mt-1 text-sm sm:text-base">Monitor, edit, and control your shortened links</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                  <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-lg sm:text-2xl font-bold">Slink</span>
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

                {/* New URL Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to='/shorten'>
                    <button className="px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <Plus className="w-4 h-4" />
                      <span>New URL</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* URLs Grid */}
            <div className="space-y-4 sm:space-y-6 animate-fade-in-up animation-delay-400">
              {filteredUrls.map((url, index) => (
                <div
                  key={url._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex flex-col space-y-4">
                    {/* URL Info */}
                    <div className="space-y-3">
                      {/* Title and Status */}
                      <div className="flex flex-col  md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                        <h3 className="text-lg font-semibold text-white break-words">
                          {url?.title || url.originalUrl}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {url.isActive ? (
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
                          {url.expiresAt && (
                            <span className="flex items-center space-x-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs">
                              <Clock className="w-3 h-3" />
                              <span className="inline">Expires {new Date(url.expiresAt).toLocaleString()}</span>
                            </span>
                          )}
                          {url.isOneTime && (
                            <span className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs">
                              <span>One-time</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* URLs */}
                      <div className="space-y-2">

                        {/* Short Url Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="text-gray-400 text-sm flex-shrink-0">Short URL:</span>
                          <div className="flex items-center space-x-2 min-w-0">
                            <span className="text-purple-400 font-mono text-sm break-all">{getShortUrlPath(url.shortUrl)}</span>
                            <button
                              onClick={async () => await handleUrlCopy(url)}
                              className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                            >
                              <Copy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-400'}`} />

                            </button>
                          </div>
                        </div>

                        {/* Original Url Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="text-gray-400 text-sm flex-shrink-0">Original:</span>
                          <div className="flex items-center space-x-2 min-w-0">
                            <span className="text-gray-300 text-sm break-all">{url.originalUrl}</span>
                            <button
                              onClick={() => window.open(url.originalUrl, '_blank')}
                              className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{url.clickCount} clicks</span>
                        </span>
                        <span className="inline">Created {new Date(url.createdAt).toLocaleString()}</span>


                      </div>
                    </div>






                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                      {/* Edit button */}
                      <button
                        onClick={() => handleEdit(url)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* QR button */}
                      <button
                        onClick={() => {
                          setSelectedUrl(url);
                          setShowQrModal(true);
                        }}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200"
                        title="QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      {/* DashBoard button */}
                      <Link to={`/analytics/${url._id}`}>
                        <button
                          className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
                          title="Statistics"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      </Link>


                      {/* Password Management */}
                      <button
                        onClick={() => handlePasswordChange(url)}
                        className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-200"
                        title="Change Password"
                      >
                        <Lock className="w-4 h-4" />
                      </button>


                      {/* Activation Status Button*/}
                      <button
                        onClick={() => {
                          setSelectedUrl(url)
                          setShowStatusModal(true)
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${url.isActive
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                        title={url.isActive ? 'Disable' : 'Enable'}
                      >
                        {url.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>


                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setShowDeleteModal(true)
                          setSelectedUrl(url)
                        }}
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
                  <LinkIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No URLs found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}

      {showStatusModal && (
        <ToggleStatusModal
          isActive={selectedUrl?.isActive}
          onCancel={() => {
            setShowStatusModal(false);
            setSelectedUrl(null);
          }}
          onConfirm={makeApiCallToChangeStatus}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={() => {
            setShowDeleteModal(false)
            setSelectedUrl(null)
          }}
          onConfirm={makeApiCallToDeleteLink}
        />
      )}

      {/* Edit Modal */}
      <EditUrlModal
        show={showEditModal}
        formData={editForm}
        setFormData={setEditForm}
        onCancel={() => setShowEditModal(false)}
        onSave={makeApiCallToSaveEditChanges}
      />

      {/* Password Modal */}
      <ChangePasswordModal
        show={showPasswordModal}
        formData={passwordForm}
        setFormData={setPasswordForm}
        onCancel={() => setShowPasswordModal(false)}
        onUpdate={makeApiCallToHandlePasswordChange}
      />

      {/* QR Code Modal */}
      <QrCodeModal
        show={showQrModal}
        selectedUrl={selectedUrl}
        onClose={() => setShowQrModal(false)}
        onDownload={downloadImage}
      />
    </div>
  );
};

export default ManageUrls;