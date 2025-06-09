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
  applicantId: { name: string; email: string };
  jobId: { title: string };
}

export default function ResultsViewer() {
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get('/api/screening-results');
      setResults(res.data);
      setLoading(false);
    };
    fetchResults();
  }, []);

  if (loading) return <p className='text-center mt-6'>Loading results...</p>;

  return (
    <div className='w-full mx-auto my-6 space-y-6'>
      <h2 className='text-3xl font-semibold text-center mb-4'>
        AI Screening Results
      </h2>
      {results.map((res) => (
        <div key={res._id} className='bg-gray-100 p-5 rounded-2xl shadow-md'>
          <h3 className='text-xl font-bold'>
            {res.applicantId.name} ({res.applicantId.email})
          </h3>
          <p className='text-sm text-gray-600'>
            Matched for: <strong>{res.jobId.title}</strong>
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
