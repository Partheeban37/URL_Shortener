    // frontend/app/page.js
    'use client';

    import { useState } from 'react';

    // The backend URL is passed as an environment variable
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    export default function Home() {
      const [longUrl, setLongUrl] = useState('');
      const [shortUrl, setShortUrl] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setShortUrl('');

        try {
          const response = await fetch(`${API_URL}/api/shorten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longUrl }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to shorten URL.');
          }

          const data = await response.json();
          setShortUrl(data.shortUrl);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-400">URL Shortener</h1>
            <p className="text-xl mb-6 text-gray-300">Enter a long URL to get a short one.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="url"
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., https://www.example.com/a-very-long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full p-3 bg-emerald-500 text-white font-bold rounded-md hover:bg-emerald-600 transition-colors duration-200 disabled:bg-gray-500"
                disabled={loading}
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-600 text-white rounded-md">
                <p>{error}</p>
              </div>
            )}

            {shortUrl && (
              <div className="mt-6 p-4 bg-gray-700 rounded-md">
                <h2 className="text-lg font-semibold text-emerald-300">Your shortened URL:</h2>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-emerald-400 underline break-all hover:text-emerald-300 transition-colors"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }
    
