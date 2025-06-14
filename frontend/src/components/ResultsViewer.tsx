// components/ResultsViewer.tsx
// Displays AI-generated screening results by fetching from /api/screening-results.

import { useEffect, useState } from 'react';
import axios from 'axios';

interface ScreeningResult {
  _id: string;
  summary: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  interviewQuestions: string[];
  // Updated interfaces to reflect that populated fields might be null if not found
  applicantId: { name: string; email: string } | null;
  jobId: { title: string } | null;
}

export default function ResultsViewer() {
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // === Pagination Constants & State ===
  const RESULTS_PER_PAGE = 2; // Number of results to show per page

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('/api/screening-results');
        // --- CRITICAL FIX FOR 304 BLANK PAGE ---
        // If the response status is 304, axios.data will be empty.
        // We should *not* update the results state in this case,
        // as the browser is expected to use its cached version,
        // meaning the component should ideally retain its previous data.
        // If res.data is defined and is an array, then update.
        if (res.status === 200 && Array.isArray(res.data)) {
          setResults(res.data);
          setError(null); // Clear any previous error
        } else if (res.status === 304) {
          console.log(
            'Received 304 Not Modified. Using cached data (if available).'
          );
          // Important: Do NOT setResults(undefined) or setResults(null).
          // If `results` was already populated from a previous successful 200 fetch,
          // it should retain that state. If it was empty, it stays empty.
          setError(null); // This isn't an error, so clear any previous error state.
        } else {
          // Handle other non-200, non-304 successful responses (e.g., 204 No Content)
          // or if res.data is unexpectedly not an array.
          // For simplicity, we'll treat it as no results.
          setResults([]);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch screening results:', err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.error ||
              `Failed to load results (${
                err.response?.status || 'network error'
              }). Please try again later.`
          );
        } else {
          setError(
            'An unexpected error occurred. Please check your network connection.'
          );
        }
        setResults([]); // Clear results on actual fetch error to avoid rendering stale/partial data
      } finally {
        setLoading(false); // Always stop loading, regardless of success or failure
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p className='text-center mt-6'>Loading results...</p>;
  if (error) {
    return (
      <div className='w-full mx-auto my-6 p-5 rounded-2xl bg-red-100 text-red-700 text-center shadow-md'>
        <p className='text-xl font-semibold'>Error Loading Results</p>
        <p className='mt-2'>{error}</p>
        <p className='mt-4 text-sm'>
          If the issue persists, try a hard refresh (Ctrl/Cmd + Shift + R) or
          contact support.
        </p>
      </div>
    );
  }

  if (results.length === 0 && !loading && !error) {
    return (
      <p className='text-center mt-6 text-gray-600'>
        No screening results available yet. Run the AI screening to generate
        some!
      </p>
    );
  }

  // === Render Results ===
  return (
    <div className='w-full mx-auto my-6 space-y-6'>
      <h2 className='text-3xl font-semibold text-center mb-4'>
        AI Screening Results
      </h2>
      {paginatedResults.map((res) => (
        <div
          key={res._id}
          className='bg-white border rounded-2xl p-6 shadow-md space-y-4'
        >
          <div className='flex flex-col md:flex-row justify-between md:items-center'>
            <div>
              {/* SAFEGUARDS ADDED HERE - Optional Chaining (?.) and Nullish Coalescing (||)*/}
              <h3 className='text-xl font-bold'>
                {res.applicantId?.name || 'Unknown Applicant'}{' '}
                <span className='text-sm text-gray-500'>
                  ({res.applicantId?.email || 'N/A'})
                </span>
              </h3>
              <p className='text-sm text-gray-700 mt-1'>
                Matched for:{' '}
                <span className='font-medium'>
                  {res.jobId?.title || 'Unknown Job'}
                </span>
              </p>
            </div>
            <div className='mt-2 md:mt-0'>
              <p className='text-sm text-gray-600'>Match Score</p>
              <p className='text-2xl font-bold text-green-600'>{res.score}%</p>
            </div>
          </div>

          <div>
            <p className='font-semibold text-gray-800 mb-1'>Summary</p>
            <p className='text-sm text-gray-700 bg-gray-50 p-3 rounded-md border'>
              {res.summary}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='font-semibold text-green-700'>Strengths</p>
              <ul className='list-disc list-inside text-sm text-green-800'>
                {res.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className='font-semibold text-red-700'>Weaknesses</p>
              <ul className='list-disc list-inside text-sm text-red-800'>
                {res.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className='font-semibold text-gray-800'>
              Suggested Interview Questions
            </p>
            <ul className='list-decimal list-inside text-sm text-gray-700 space-y-1'>
              {res.interviewQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {/* === Pagination Controls === */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-6'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50'
          >
            Previous
          </button>
          <span className='text-sm font-medium text-gray-700'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
