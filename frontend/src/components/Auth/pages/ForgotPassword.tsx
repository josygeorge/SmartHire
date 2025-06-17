// components/Auth/pages/ForgotPassword.tsx
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Reset link sent. Please check your email.');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h2>
      {message && (
        <p className='text-sm text-center text-green-600'>{message}</p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
