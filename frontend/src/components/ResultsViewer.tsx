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
  return (
    <div className='w-full mx-auto my-6 space-y-6'>
      <h2 className='text-3xl font-semibold text-center mb-4'>
        AI Screening Results
      </h2>
      {results.map((res) => (
        <div key={res._id} className='bg-gray-100 p-5 rounded-2xl shadow-md'>
          {/* SAFEGUARDS ADDED HERE - Optional Chaining (?.) and Nullish Coalescing (||)*/}
          <h3 className='text-xl font-bold'>
            {res.applicantId?.name || 'Unknown Applicant'} (
            {res.applicantId?.email || 'N/A'})
          </h3>
          <p className='text-sm text-gray-600'>
            Matched for: <strong>{res.jobId?.title || 'Unknown Job'}</strong>
          </p>
          <p className='mt-2 text-gray-800'>
            <strong>Summary:</strong> {res.summary}
          </p>
          <p>
            <strong>Score:</strong> {res.score}
          </p>
          <p>
            <strong>Strengths:</strong> {res.strengths.join(', ')}
          </p>
          <p>
            <strong>Weaknesses:</strong> {res.weaknesses.join(', ')}
          </p>
          <div className='mt-2'>
            <strong>Suggested Interview Questions:</strong>
            <ul className='list-disc list-inside'>
              {res.interviewQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
