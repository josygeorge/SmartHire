/* import ResumeUpload from './components/ResumeUploadForm';
import './App.css';
import JobUploadForm from './components/JobUploadForm';
import ResultsViewer from './components/ResultsViewer';
export default function App() {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6'>SmartHire Resume Uploader</h1>
      <ResumeUpload />
      <div className='p-4'>
        <JobUploadForm />
        <ResultsViewer />
      </div>
    </div>
  );
}
 */
import './App.css';
import { useState } from 'react';
import ResumeUploadForm from './components/ResumeUploadForm';
import JobUploadForm from './components/JobUploadForm';
import ResultsViewer from './components/ResultsViewer';
import ApplicantList from './components/ApplicantList';
import JobList from './components/List/JobList';

type Tab = 'resume' | 'job' | 'applicants' | 'job list' | 'results';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');

  return (
    <div className='flex flex-col h-screen w-full bg-gray-50 text-gray-800'>
      {/* Header */}
      <header className='bg-white shadow px-6 py-4 w-full'>
        <h1 className='text-3xl font-bold text-center'>
          SmartHire AI Platform
        </h1>
      </header>

      {/* Tabs Navigation */}
      <nav className='flex justify-center flex-wrap gap-4 px-4 py-4 bg-gray-100 w-full'>
        {(['resume', 'job', 'applicants', 'job list', 'results'] as Tab[]).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gray-700 text-white'
                  : 'bg-white border hover:bg-gray-200'
              }`}
            >
              {tab === 'resume' && 'Resume Upload'}
              {tab === 'job' && 'Job Upload'}
              {tab === 'applicants' && 'List of Applicants'}
              {tab === 'job list' && 'List of Jobs'}
              {tab === 'results' && 'View Results'}
            </button>
          )
        )}
      </nav>

      {/* Main Content */}
      <main className='flex-1 w-full px-4 flex justify-center overflow-auto'>
        <div className='max-w-screen-xl w-full mx-auto'>
          {activeTab === 'resume' && <ResumeUploadForm />}
          {activeTab === 'job' && <JobUploadForm />}
          {activeTab === 'applicants' && <ApplicantList />}
          {activeTab === 'job list' && <JobList />}
          {activeTab === 'results' && <ResultsViewer />}
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white text-center text-sm text-gray-500 py-4 w-full'>
        © {new Date().getFullYear()} SmartHire. All rights reserved.
      </footer>
    </div>
  );
}
