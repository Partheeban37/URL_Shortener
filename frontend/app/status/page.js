'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function StatusPage() {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState('');

  useEffect(() => {
async function fetchStatus() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    const text = await response.text(); // <-- read plain text
    if (text.trim().toUpperCase() === 'OK') {
      setStatus(` Healthy - ${text}`);
    } else {
      setStatus(`Unhealthy - ${text}`);
    }
  } catch (err) {
    setError(err.message);
    setStatus('Unhealthy');
  }
}
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-emerald-400">System Status</h1>
      <div
        className={`p-4 rounded-lg shadow-md text-lg font-semibold ${
          status.includes('✅') ? 'bg-green-700' : 'bg-red-700'
        }`}
      >
        {status}
      </div>
      {error && (
        <p className="mt-3 text-sm text-gray-300">
          Error: {error}
        </p>
      )}
    </div>
  );
}
