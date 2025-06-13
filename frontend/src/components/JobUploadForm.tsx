import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useJobStore from '../store/useJobStore';
import axios from 'axios';
import { useState } from 'react';

// Define form schema with Yup
const jobSchema = yup.object({
  title: yup.string().required('Job title is required'),
  description: yup.string().required('Description is required'),
  skills: yup
    .string()
    .required('Skills are required')
    .matches(/^[a-zA-Z0-9, ]+$/, 'Comma-separated list of skills expected'),
});

type JobFormValues = {
  title: string;
  description: string;
  skills: string;
};

export default function JobUploadForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const addJob = useJobStore((state) => state.addJob);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      skills: '',
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/jobs', {
        ...data,
        skills: data.skills.split(',').map((s) => s.trim()),
      });
      addJob(response.data);
      setMessage('✅ Job uploaded successfully!');
      reset(); // reset form
    } catch (err) {
      setMessage('❌ Error uploading job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full mx-auto bg-white text-black shadow-lg rounded-2xl p-6 my-6'>
      <h2 className='text-2xl font-semibold mb-4'>Upload a Job Posting</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            {...register('title')}
            placeholder='Job Title'
            className='w-full p-2 border text-white rounded'
          />
          {errors.title && (
            <p className='text-red-500 text-sm'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('description')}
            placeholder='Job Description'
            rows={4}
            className='w-full p-2 border text-white rounded'
          />
          {errors.description && (
            <p className='text-red-500 text-sm'>{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('skills')}
            placeholder='Required Skills (comma-separated)'
            className='w-full p-2 border text-white rounded'
          />
          {errors.skills && (
            <p className='text-red-500 text-sm'>{errors.skills.message}</p>
          )}
        </div>

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
