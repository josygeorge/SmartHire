import ResumeUpload from './components/ResumeUploadForm';
import './App.css';
export default function App() {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6'>SmartHire Resume Uploader</h1>
      <ResumeUpload />
    </div>
  );
}
