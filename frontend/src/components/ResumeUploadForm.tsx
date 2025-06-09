import React, { useRef } from 'react'; // 👈 Add useRef to implement reset()
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useApplicantStore } from '../store/applicantStore';

interface FormInputs {
  name: string;
  email: string;
  resume?: FileList;
}

// Yup schema for validation
const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    resume: yup
      .mixed()
      .required('Resume file is required')
      .test('fileType', 'Only .txt or .pdf files allowed', (value) => {
        if (!value) return false;

        const fileList = value as FileList | null;
        if (!fileList || fileList.length === 0) return false;

        const allowedTypes = ['text/plain', 'application/pdf'];
        return allowedTypes.includes(fileList[0].type);
      }),
  })
  .required(); // Add `.required()` at the end for stricter inference;

const ResumeUploadForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // Add reset
  } = useForm<FormInputs>({
    // Cast schema to any here to fix type incompatibility
    resolver: yupResolver(schema as any),
  });

  const addApplicant = useApplicantStore((state) => state.addApplicant);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = async (data: FormInputs) => {
    if (!data.resume || data.resume.length === 0) {
      alert('Please upload a resume file.');
      return;
    }
    // Cast resume to FileList here
    const resumeFiles = data.resume as FileList;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('resume', resumeFiles[0]);
    try {
      const response = await axios.post('/api/applicants', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      addApplicant(response.data.applicant);
      alert('Resume uploaded successfully!');
      reset(); // 👈 Reset form fields
      if (fileInputRef.current) fileInputRef.current.value = ''; // 👈 Clear file input
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full mx-auto p-6 bg-white text-white rounded shadow space-y-4'
    >
      <div>
        <label className='block font-semibold mb-1' htmlFor='name'>
          Name
        </label>
        <input
          {...register('name')}
          id='name'
          type='text'
          className={`w-full border p-2 rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='Your full name'
        />
        {errors.name && (
          <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className='block font-semibold mb-1' htmlFor='email'>
          Email
        </label>
        <input
          {...register('email')}
          id='email'
          type='email'
          className={`w-full border p-2 rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='Your email'
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className='block font-semibold mb-1' htmlFor='resume'>
          Resume (TXT or PDF)
        </label>
        <input
          {...register('resume')}
          ref={(e) => {
            register('resume').ref(e);
            fileInputRef.current = e; // 👈 Assign to ref
          }} // Attach ref to input
          id='resume'
          type='file'
          accept='.txt,.pdf'
          className={`w-full text-gray-600 border p-2 rounded ${
            errors.resume ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.resume && (
          <p className='text-red-500 text-sm mt-1'>{errors.resume.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className=' bg-blue-600 text-white p-3 rounded hover:bg-blue-500 transition disabled:opacity-50'
      >
        {isSubmitting ? 'Uploading...' : 'Upload Resume'}
      </button>
    </form>
  );
};

export default ResumeUploadForm;
