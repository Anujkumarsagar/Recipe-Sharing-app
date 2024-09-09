import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, Lock, Eye, EyeOff } from 'lucide-react';

export default function Settings({ userLoggedIn }) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    theme: 'light',
    language: 'en',
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
    },
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNotificationChange = (type) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
    // Here you would typically apply the theme to your application
  };

  const handleLanguageChange = (e) => {
    setSettings((prev) => ({ ...prev, language: e.target.value }));
  };

  const handlePrivacyChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log('Saving settings:', settings);
  };

  return (
    <>
      {userLoggedIn ? (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            {/* Notifications Section */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-2">
                {Object.entries(settings.notifications).map(([type, enabled]) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleNotificationChange(type)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{type} notifications</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Theme Section */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center px-4 py-2 rounded-md ${settings.theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                >
                  <Sun className="w-5 h-5 mr-2" />
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center px-4 py-2 rounded-md ${settings.theme === 'dark' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                >
                  <Moon className="w-5 h-5 mr-2" />
                  Dark
                </button>
              </div>
            </section>

            {/* Language Section */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Language</h3>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-gray-500" />
                <select
                  value={settings.language}
                  onChange={handleLanguageChange}
                  className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Privacy</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">Profile Visibility</label>
                  <select
                    id="profileVisibility"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Show email on profile</span>
                </label>
              </div>
            </section>

            {/* Password Change Section */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={settings.password}
                      onChange={handlePasswordChange}
                      className="form-input block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Enter new password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" onClick={() => setShowPassword(false)} />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" onClick={() => setShowPassword(true)} />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={settings.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-input block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Confirm new password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" onClick={() => setShowConfirmPassword(false)} />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" onClick={() => setShowConfirmPassword(true)} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Settings
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-gray-600">Please log in to view your settings.</div>
      )}
    </>
  );
}
