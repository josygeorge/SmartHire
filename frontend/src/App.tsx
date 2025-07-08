import './App.css';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';

import ResumeUploadForm from './components/Upload/ResumeUploadForm';
import JobUploadForm from './components/Upload/JobUploadForm';
import ResultsViewer from './components/ResultsViewer';
import ApplicantList from './components/List/ApplicantList';
import JobList from './components/List/JobList';
import SignIn from './components/Auth/pages/SignIn';
import SignUp from './components/Auth/pages/SignUp';
import ForgotPassword from './components/Auth/pages/ForgotPassword';
import ResetPassword from './components/Auth/pages/ResetPassword';

import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import LogoutButton from './components/Auth/LogoutButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tabConfig } from './config/tabConfig';

type Tab = 'resume' | 'job' | 'applicants' | 'job-list' | 'results';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role } = useAuthStore();

  const isAdmin = role === 'admin';

  const tabs: Tab[] = ['resume', 'job', 'applicants', 'job-list', 'results'];

  useEffect(() => {
    const currentTab = location.pathname.slice(1) as Tab;
    if (tabs.includes(currentTab)) setActiveTab(currentTab);
  }, [location]);

  /* useEffect(() => {
    const publicPaths = [
      '/signin',
      '/signup',
      '/forgot-password',
      '/reset-password',
    ];

    const currentPath = location.pathname;
    const isPublicPath = publicPaths.some((path) =>
      currentPath.startsWith(path)
    );

    if (!token && !isPublicPath) {
      navigate('/signin', { replace: true });
    } else if (token && (currentPath === '/' || isPublicPath)) {
      navigate('/resume', { replace: true });
    }
  }, [token, location.pathname]); */

  // Don’t redirect on every public/private route, just fix the root (/) issue.
  // This is to ensure that the root path redirects correctly based on authentication status.
  useEffect(() => {
    if (!token && location.pathname === '/') {
      navigate('/signin', { replace: true });
    } else if (token && location.pathname === '/') {
      navigate('/results', { replace: true });
    }
  }, [token, location.pathname]);

  const visibleTabs = tabConfig.filter((tab) => !tab.adminOnly || isAdmin);

  return (
    <div className='flex flex-col h-screen w-full bg-gray-50 text-gray-800'>
      <header className='bg-white shadow px-6 py-4 w-full flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>SmartHire AI Platform</h1>
        {token && <LogoutButton />}
      </header>

      {token && (
        <nav className='flex justify-center flex-wrap gap-4 px-4 py-4 bg-gray-100 w-full'>
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gray-700 text-white'
                  : 'bg-white border hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      <main className='flex-1 w-full px-4 flex justify-center overflow-auto'>
        <div className='max-w-screen-xl w-full mx-auto'>
          <Routes>
            <Route
              path='/signin'
              element={token ? <Navigate to='/results' /> : <SignIn />}
            />
            <Route
              path='/signup'
              element={token ? <Navigate to='/results' /> : <SignUp />}
            />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
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
            {/* Fallback Route - Catch-all route for any undefined paths */}
            <Route
              path='*'
              element={<Navigate to={token ? '/resume' : '/signin'} replace />}
            />
          </Routes>
        </div>
      </main>

      <ToastContainer position='top-right' autoClose={3000} />

      <footer className='bg-white text-center text-sm text-gray-500 py-4 w-full'>
        © {new Date().getFullYear()} SmartHire. All rights reserved.
      </footer>
    </div>
  );
}
