import React, { useState } from 'react';
import { User, Link2, Shield, Save, Check, Eye } from 'lucide-react';

const Settings: React.FC = () => {
  const [customUsername, setCustomUsername] = useState('sophia-clark');
  const [magicLinkEnabled, setMagicLinkEnabled] = useState(true);
  const [accessControl, setAccessControl] = useState<'open' | 'privacy'>('open');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your profile settings and privacy controls</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Custom Username Management */}
        <SettingsSection
          icon={User}
          title="Custom Username Management"
          description="Set and edit your human-readable, custom username"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Username
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative min-w-0">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    thedatecrew.com/profile/
                  </span>
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value)}
                    className="w-full pl-4 sm:pl-48 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                    className="w-full pl-4 sm:pl-48 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-sm"
                    placeholder="your-username"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="px-3 sm:px-4 py-3 bg-custom-amber text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2 text-sm whitespace-nowrap"
                >
                  <Save className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 break-all">
                Your profile will be accessible at: https://thedatecrew.com/profile/{customUsername}
              </p>
            </div>
          </div>
        </SettingsSection>

        {/* Magic Link Settings */}
        <SettingsSection
          icon={Link2}
          title="Magic Link Settings"
          description="Enable or disable magic link functionality"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Enable Magic Link</h4>
              <p className="text-sm text-gray-600">Allow passwordless access via email links</p>
            </div>
            <ToggleSwitch
              enabled={magicLinkEnabled}
              onChange={setMagicLinkEnabled}
            />
          </div>
        </SettingsSection>

        {/* Access Control Settings */}
        <SettingsSection
          icon={Shield}
          title="Access Control Settings"
          description="Control who can view your Magic Link profile and what information is visible"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AccessControlCard
                title="Open Access"
                description="Anyone with a link can view the full Magic Link profile"
                selected={accessControl === 'open'}
                onClick={() => setAccessControl('open')}
                icon={Eye}
              />
              <AccessControlCard
                title="Privacy Enabled"
                description="Only image and 'about me' are publicly visible in Magic Link; rest is locked"
                selected={accessControl === 'privacy'}
                onClick={() => setAccessControl('privacy')}
                icon={Shield}
              />
            </div>
          </div>
        </SettingsSection>

      </div>

      {/* Save Confirmation */}
      {saved && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>Settings saved successfully!</span>
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

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-custom-amber' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

interface AccessControlCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ComponentType<any>;
}

const AccessControlCard: React.FC<AccessControlCardProps> = ({ title, description, selected, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 text-left transition-all ${
        selected
          ? 'border-custom-amber bg-amber-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 mt-1 ${selected ? 'text-custom-amber' : 'text-gray-400'}`} />
        <div>
          <h4 className={`font-medium ${selected ? 'text-amber-900' : 'text-gray-900'}`}>
            {title}
          </h4>
          <p className={`text-sm mt-1 ${selected ? 'text-amber-700' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};


export default Settings;