import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ResumeUploadForm from './components/Upload/ResumeUploadForm';
import JobUploadForm from './components/Upload/JobUploadForm';
import ResultsViewer from './components/ResultsViewer';
import ApplicantList from './components/List/ApplicantList';
import JobList from './components/List/JobList';
import SignIn from './components/Auth/pages/SignIn';
import SignUp from './components/Auth/pages/SignUp';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import LogoutButton from './components/Auth/LogoutButton';
import ForgotPassword from './components/Auth/pages/ForgotPassword';

type Tab = 'resume' | 'job' | 'applicants' | 'job-list' | 'results';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuthStore();

  const tabs: Tab[] = ['resume', 'job', 'applicants', 'job-list', 'results'];

  useEffect(() => {
    const currentTab = location.pathname.slice(1) as Tab;
    if (tabs.includes(currentTab)) {
      setActiveTab(currentTab);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/' && token) {
      navigate('/resume');
    }
  }, [location, token, navigate]);

  return (
    <div className='flex flex-col h-screen w-full bg-gray-50 text-gray-800'>
      {/* Header */}
      <header className='bg-white shadow px-6 py-4 w-full flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>SmartHire AI Platform</h1>
        {token && <LogoutButton />}
      </header>

      {/* Tabs Navigation */}
      {location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/forgot-password' && (
          <nav className='flex justify-center flex-wrap gap-4 px-4 py-4 bg-gray-100 w-full'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => navigate(`/${tab}`)}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'bg-white border hover:bg-gray-200'
                }`}
              >
                {
                  {
                    resume: 'Resume Upload',
                    job: 'Job Upload',
                    applicants: 'List of Applicants',
                    'job-list': 'List of Jobs',
                    results: 'View Results',
                  }[tab]
                }
              </button>
            ))}
          </nav>
        )}

      {/* Main Content */}
      <main className='flex-1 w-full px-4 flex justify-center overflow-auto'>
        <div className='max-w-screen-xl w-full mx-auto'>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route
              path='/resume'
              element={
                <ProtectedRoute allowedRoles={['admin', 'user']}>
                  <ResumeUploadForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/job'
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <JobUploadForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/applicants'
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ApplicantList />
                </ProtectedRoute>
              }
            />
            <Route
              path='/job-list'
              element={
                <ProtectedRoute allowedRoles={['admin', 'user']}>
                  <JobList />
                </ProtectedRoute>
              }
            />
            <Route
              path='/results'
              element={
                <ProtectedRoute allowedRoles={['admin', 'user']}>
                  <ResultsViewer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white text-center text-sm text-gray-500 py-4 w-full'>
        © {new Date().getFullYear()} SmartHire. All rights reserved.
      </footer>
    </div>
  );
}
