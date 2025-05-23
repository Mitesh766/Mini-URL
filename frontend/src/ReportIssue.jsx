import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bug, 
  MessageSquare, 
  Send, 
  User, 
  Mail, 
  FileText,
  Camera,
  Paperclip,
  CheckCircle
} from 'lucide-react';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    subject: '',
    description: '',
    severity: 'medium',
    attachments: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueTypes = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-400' },
    { id: 'feature', label: 'Feature Request', icon: MessageSquare, color: 'text-blue-400' },
    { id: 'performance', label: 'Performance Issue', icon: AlertTriangle, color: 'text-orange-400' },
    { id: 'security', label: 'Security Concern', icon: AlertTriangle, color: 'text-purple-400' },
    { id: 'other', label: 'Other', icon: FileText, color: 'text-gray-400' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'high', label: 'High', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { id: 'critical', label: 'Critical', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        issueType: '',
        subject: '',
        description: '',
        severity: 'medium',
        attachments: []
      });
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        {/* Fixed Background Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          <div className="absolute top-20 left-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-3000"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4 py-8">
          <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 text-center max-w-md w-full animate-fade-in-up">
            <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Issue Reported Successfully!</h2>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Thank you for your report. We'll review it and get back to you within 24-48 hours.
            </p>
            <div className="bg-white/5 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-300">
                <strong>Reference ID:</strong> #ISS-{Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
              <p className="text-sm text-gray-300 mt-1 break-all">
                <strong>Email:</strong> {formData.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Fixed Background Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-20 left-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-xl">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Report an Issue
                </h1>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Encountered a problem or have a suggestion? Let us know and we'll help you resolve it quickly.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 animate-fade-in-up animation-delay-200">
            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Issue Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Issue Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {issueTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, issueType: type.id }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left h-20 flex items-center ${
                          formData.issueType === type.id
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <Icon className={`w-5 h-5 flex-shrink-0 ${type.color}`} />
                          <span className="text-white font-medium text-sm leading-tight">{type.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Severity Level
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {severityLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, severity: level.id }))}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                        formData.severity === level.id
                          ? level.color
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please provide as much detail as possible about the issue, including steps to reproduce it..."
                  required
                />
              </div>

              {/* File Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-4 sm:p-6 text-center hover:border-white/30 transition-colors duration-300">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <div className="bg-white/10 rounded-full p-3">
                      <Paperclip className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-purple-400 hover:text-purple-300 font-medium">
                        Choose files
                      </span>
                      <span className="text-gray-400"> or drag them here</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center px-2">
                      Supports: Images, PDF, DOC, TXT (Max 10MB each)
                    </p>
                  </label>
                </div>

                {/* Attachment List */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-white text-sm truncate">{file.name}</span>
                          <span className="text-gray-400 text-xs flex-shrink-0">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-2 flex-shrink-0"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Submit Issue Report</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-6 lg:mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-blue-400 font-medium mb-1">Need immediate help?</h4>
                  <p className="text-gray-400 text-sm">
                    For urgent issues, contact our support team directly at{' '}
                    <a href="mailto:support@slink.com" className="text-blue-400 hover:text-blue-300 break-all">
                      support@slink.com
                    </a>{' '}
                    or check our{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      FAQ section
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ReportIssue;