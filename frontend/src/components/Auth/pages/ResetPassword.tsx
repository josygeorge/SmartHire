// components/Auth/pages/ResetPassword.tsx
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setMessage('Password reset successful. Redirecting to Sign In...');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Reset failed');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Reset Password</h2>
      {message && (
        <p className='text-sm text-center text-green-600'>{message}</p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='password'
          placeholder='New password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full px-4 py-2 border rounded'
        />
        <button
          type='submit'
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
