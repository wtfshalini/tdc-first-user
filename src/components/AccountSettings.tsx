import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, Camera, Pause, Trash2, AlertTriangle } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && currentPassword && newPassword) {
      setPasswordChanged(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordChanged(false), 3000);
    }
  };

  const handlePauseAccount = () => {
    setShowPauseModal(false);
    // In a real app, this would call an API to pause the account
    console.log('Account paused');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      setShowDeleteModal(false);
      // In a real app, this would call an API to delete the account
      console.log('Account deleted');
    }
  };

  const isPasswordValid = newPassword === confirmPassword && currentPassword && newPassword && newPassword.length >= 8;

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your account information and security settings</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Profile Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Profile Picture
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-custom-amber rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">SC</span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Sophia Clark</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">JPG, GIF or PNG. Max size of 2MB</p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="px-3 sm:px-4 py-2 bg-custom-amber text-white rounded-lg hover:bg-opacity-90 transition-colors text-xs sm:text-sm font-medium">
                      Upload New
                    </button>
                    <button className="px-3 sm:px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value="sophia@mail.in"
                  disabled
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm sm:text-base"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Email address cannot be changed. Contact support if you need to update this.
              </p>
            </div>
          </div>
        </div>

        {/* Password Management */}
        <SettingsSection
          icon={Lock}
          title="Password Management"
          description="Update your password to keep your account secure"
        >
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Change Password Button */}
            <div className="pt-4">
              <button
                onClick={handlePasswordChange}
                disabled={!isPasswordValid}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isPasswordValid
                    ? 'bg-custom-amber text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Account Management */}
        <SettingsSection
          icon={User}
          title="Account Management"
          description="Manage your account status and data"
        >
          <div className="space-y-6">
            {/* Pause Account */}
            <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-start space-x-3">
                <Pause className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-medium text-yellow-900">Pause Account</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Temporarily disable your account. You can reactivate it anytime by logging in.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPauseModal(true)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Pause Account
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-start space-x-3">
                <Trash2 className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>

      {/* Success Notification */}
      {passwordChanged && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>Password changed successfully!</span>
        </div>
      )}

      {/* Pause Account Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Pause className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pause Account</h3>
                <p className="text-sm text-gray-600">Temporarily disable your account</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Your account will be temporarily disabled. You can reactivate it anytime by logging in again. 
              Your data will be preserved during this time.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPauseModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePauseAccount}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Pause Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                This will permanently delete your account and all associated data including:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Profile information and Magic Link</li>
                <li>• Analytics and user session data</li>
                <li>• Account settings and preferences</li>
                <li>• All consultation history</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Type DELETE to confirm"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  deleteConfirmText === 'DELETE'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SettingsSectionProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-custom-amber" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AccountSettings;