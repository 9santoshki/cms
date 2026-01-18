'use client';

import { useEffect, useState } from 'react';

export default function OAuthDebugPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug/oauth-config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const testOAuth = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', config.clientIdFull);
    googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('access_type', 'offline');
    googleAuthUrl.searchParams.set('prompt', 'consent');

    window.location.href = googleAuthUrl.toString();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">OAuth Configuration Debugger</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>Client ID:</strong> {config.clientIdFull}
            </div>
            <div>
              <strong>Client Secret:</strong> {config.clientSecretSet ? '✓ Set' : '✗ Not Set'}
            </div>
            <div>
              <strong>Environment:</strong> {config.environment}
            </div>
            <div>
              <strong>Redirect URI (this page):</strong> {window.location.origin}/auth/callback
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Google Console Setup</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {config.instructions.map((instruction: string, i: number) => (
              <li key={i} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
          <div className="mt-4">
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Open Google Console →
            </a>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Test OAuth Flow</h2>
          <p className="text-sm text-gray-700 mb-4">
            Click the button below to test the OAuth flow. You should be redirected to Google
            and then back to your app.
          </p>
          <button
            onClick={testOAuth}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            🔐 Test Google Sign-In
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">Common Issues</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>
              <strong>Wrong Client ID:</strong> Make sure you're configuring the correct Client ID
              in Google Console (there are different ones for local vs production)
            </li>
            <li>
              <strong>Trailing slash:</strong> Don't add a trailing slash to the redirect URI
              (use <code>/auth/callback</code> not <code>/auth/callback/</code>)
            </li>
            <li>
              <strong>Propagation delay:</strong> Google Console changes can take 2-5 minutes to take effect
            </li>
            <li>
              <strong>HTTP vs HTTPS:</strong> Use http:// for localhost and https:// for production
            </li>
            <li>
              <strong>OAuth Consent Screen:</strong> Make sure your OAuth consent screen is configured
              and published (or in testing mode with your email added as a test user)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
