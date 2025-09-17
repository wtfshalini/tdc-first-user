import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Download, FileText } from 'lucide-react';

const PublicURL: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const profileUrl = 'https://thedatecrew.com/profile/sophia-clark';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    // Simulate PDF generation/download
    setTimeout(() => {
      setDownloading(false);
      // In a real app, this would trigger the actual PDF download
      console.log('PDF download initiated');
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Public URL</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your signature profile link and downloads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Magic Link Widget */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Magic Link</h3>
            <ExternalLink className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 min-w-0">
                <p className="text-xs sm:text-sm text-gray-700 font-mono break-all">{profileUrl}</p>
              </div>
              
              <button
                onClick={handleCopy}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 flex items-center justify-center min-w-[48px] sm:min-w-[56px] ${
                  copied
                    ? 'bg-green-50 border-green-200 text-green-600'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            
            {copied && (
              <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                <Check className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm font-medium">Link copied to clipboard!</span>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500">Share your Magic Link to track engagement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Profile Widget */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Download Profile</h3>
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
            Download your Magic Link Profile into PDF for easier access
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                downloading
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-custom-amber border-custom-amber text-white hover:bg-opacity-90 hover:border-opacity-90'
              }`}
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span className="font-medium">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download PDF</span>
                </>
              )}
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PublicURL;