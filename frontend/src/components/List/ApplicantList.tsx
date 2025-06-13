// src/components/ApplicantList.tsx
/*  list all uploaded applicants and allow triggering AI screening. To run AI screening, you need to:
    Display all applicants
    Select a job for comparison
    Press a “Run AI Screening” button
 */
import { useEffect, useState } from 'react';

interface Applicant {
  _id: string;
  name: string;
  resumeText: string;
}

interface Job {
  _id: string;
  title: string;
}

export default function ApplicantList() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetch('/api/applicants')
      .then((res) => res.json())
      .then(setApplicants);

    fetch('/api/jobs')
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const runScreening = async (applicantId: string) => {
    const jobId = selectedJobs[applicantId];
    if (!jobId) {
      alert('Please select a job to compare.');
      return;
    }

    try {
      const res = await fetch('/api/screening-results/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantId, jobId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to run screening.');
      }

      const result = await res.json();
      alert(`Success... Screening complete: ${result.score}% match`);
    } catch (err: any) {
      console.error('Error running screening:', err);
      alert(`Error: ${err.message || 'Something went wrong while screening.'}`);
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Applicants</h2>
      {applicants.map((applicant) => (
        <div
          key={applicant._id}
          className='bg-white p-4 shadow rounded-lg space-y-2'
        >
          <div>
            <strong>{applicant.name}</strong>
          </div>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-2'>
            <select
              className='border border-gray-400 p-2 rounded bg-gray-200'
              value={selectedJobs[applicant._id] || ''}
              onChange={(e) =>
                setSelectedJobs((prev) => ({
                  ...prev,
                  [applicant._id]: e.target.value,
                }))
              }
            >
              <option value=''>Select a job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => runScreening(applicant._id)}
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Run AI Screening
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
