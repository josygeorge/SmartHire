// pages/Signin.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      const { token, user } = res.data;
      setAuth(token, user.role); // Auth needed to include user 'role'
      navigate('/results');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>
      {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          placeholder='Email'
          //value={email}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          //onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <input
          type='password'
          placeholder='Password'
          value={form.password}
          //value={password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          //onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <button
          type='submit'
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
        >
          Sign In
        </button>
      </form>
      <div className='mt-4 flex justify-between text-sm'>
        <Link to='/forgot-password' className='text-blue-600 hover:underline'>
          Forgot Password?
        </Link>
        <Link to='/signup' className='text-blue-600 hover:underline'>
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
