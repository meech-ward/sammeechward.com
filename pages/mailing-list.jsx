import React, { useState, useEffect } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const MailingListForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(true); // Start true to prevent flash

  useEffect(() => {
    const signupStatus = Cookies.get('newsletter_signup') === 'true';
    setHasSignedUp(signupStatus);
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      Cookies.set('newsletter_signup', 'true', { 
        expires: 365,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      setStatus('success');
      setEmail('');
      
      // Hide form after success
      setTimeout(() => {
        setHasSignedUp(true);
      }, 3000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  // Don't render anything until after client-side hydration
  if (!mounted) return null;
  
  // Don't show form if user has already signed up
  if (hasSignedUp) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200 clear-both mt-10">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
        <p className="text-gray-600">Join our mailing list for the latest news and updates.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={status === 'loading'}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Subscribing...
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md">
          Thanks for subscribing! 
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MailingListForm;