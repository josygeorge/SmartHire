// components/JobUploadForm.tsx
// This component lets users submit a job description, title, and skills to your backend (POST /api/jobs)
import { useState } from 'react';
import axios from 'axios';
import useJobStore from '../store/useJobStore';

export default function JobUploadForm() {
  const [form, setForm] = useState({ title: '', description: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Using Zustand store to manage jobs
  const addJob = useJobStore((state) => state.addJob);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/jobs', {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()),
      });
      const createdJob = response.data;
      // Add the new job to the Zustand store
      addJob(createdJob);
      setMessage('Job uploaded successfully!');
      setForm({ title: '', description: '', skills: '' });
    } catch (err) {
      setMessage('Error uploading job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full mx-auto bg-white text-white shadow-lg rounded-2xl p-6 my-6'>
      <h2 className='text-2xl font-semibold mb-4'>Upload a Job Posting</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          name='title'
          value={form.title}
          onChange={handleChange}
          placeholder='Job Title'
          className='w-full p-2 border rounded'
          required
        />
        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Job Description'
          className='w-full p-2 border rounded'
          rows={4}
          required
        />
        <input
          name='skills'
          value={form.skills}
          onChange={handleChange}
          placeholder='Required Skills (comma-separated)'
          className='w-full p-2 border rounded'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          {loading ? 'Uploading...' : 'Submit Job'}
        </button>
        {message && <p className='text-sm mt-2'>{message}</p>}
      </form>
    </div>
  );
}
