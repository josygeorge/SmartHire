// pages/Signup.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      const { token, role } = res.data;
      setAuth(token, role);
      navigate('/results'); // redirect after login
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
      {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <input
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <input
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className='w-full px-4 py-2 border rounded text-white'
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className='w-full px-4 py-2 border rounded text-white'
        >
          <option value='user' selected>
            User
          </option>
          <option value='admin' hidden>
            Admin
          </option>
        </select>
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Sign Up
        </button>
      </form>
      <div className='mt-4 flex justify-between text-sm'>
        <Link to='/signin' className='text-blue-600 hover:underline'>
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
