import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const LinkWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Magic Link</h3>
        <ExternalLink className="w-5 h-5 text-gray-400" />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Share your profile link to track engagement and conversions
      </p>
      
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-700 font-mono truncate">{profileUrl}</p>
        </div>
        
        <button
          onClick={handleCopy}
          className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center ${
            copied
              ? 'bg-green-50 border-green-200 text-green-600'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
      
      {copied && (
        <p className="text-sm text-green-600 mt-2 flex items-center">
          <Check className="w-4 h-4 mr-1" />
          Link copied to clipboard!
        </p>
      )}
    </div>
  );
};

export default LinkWidget;