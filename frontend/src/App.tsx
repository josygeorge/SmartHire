import './App.css';
import { useEffect } from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SettingsDropDown from './components/Header/SettingsDropDown';
import Sidebar from './components/MainMenu/SideBar';

export default function App() {
  const navigate = useNavigate(); // Use navigate to programmatically change routes
  // Use location to access the current path
  // This is useful for checking the current route and redirecting accordingly.
  // For example, if the user is not authenticated and tries to access a protected route,
  // you can redirect them to the sign-in page.
  // If the user is authenticated, you can redirect them to the results page.
  const location = useLocation();
  const { token, role } = useAuthStore();
  // // Check if the user is an admin
  // This is used to conditionally render admin-only components or routes.
  const isAdmin = role === 'admin';

  // Don’t redirect on every public/private route, just fix the root (/) issue.
  // This is to ensure that the root path redirects correctly based on authentication status.
  useEffect(() => {
    if (!token && location.pathname === '/') {
      navigate('/signin', { replace: true });
    } else if (token && location.pathname === '/') {
      navigate('/results', { replace: true });
    }
  }, [token, location.pathname]);

  return (
    <div className='flex flex-col h-screen w-full bg-gray-50 text-gray-800'>
      {/* Header stays fixed at the top */}
      <header className='bg-white shadow px-6 py-4 w-full flex justify-between items-center z-10'>
        <h1 className='text-2xl font-bold'>SmartHire AI Platform</h1>
        {token && <SettingsDropDown />}
      </header>

      {/* Main Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* <div className='flex flex-1 overflow-hidden'> */}
        {/* Sidebar */}
        {/* Display vertical navigation on the left (instead of top). */}
        {token && <Sidebar isAdmin={isAdmin} />}
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
                element={
                  <Navigate to={token ? '/resume' : '/signin'} replace />
                }
              />
            </Routes>
          </div>
        </main>
      </div>

      <ToastContainer position='top-right' autoClose={3000} />

      <footer className='bg-white text-center text-sm text-gray-500 py-4 w-full'>
        © {new Date().getFullYear()} SmartHire. All rights reserved.
      </footer>
    </div>
  );
}
