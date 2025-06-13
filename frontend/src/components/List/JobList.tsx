// components/JobList.tsx
import { useEffect, useState, useMemo } from 'react';
import { useJobStore } from '../../store/useJobStore';
import axios from 'axios';
import debounce from 'lodash.debounce';

export default function JobList() {
  const jobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);
  const deleteJob = useJobStore((state) => state.deleteJob);
  const updateJob = useJobStore((state) => state.updateJob);

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    skills: '',
  });

  // Debounce Search filter
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Fetch jobs from the API and populate Zustand store on component mount
  // - Zustand hydration on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setJobs(res.data); // Populate Zustand store
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, [setJobs]);
  console.log(jobs);

  // Debounced search handler
  useEffect(() => {
    setFilteredJobs(jobs); // Reset when jobs change
  }, [jobs]);

  // Debounced search (300ms) to filter job titles
  const debouncedFilter = useMemo(
    () =>
      debounce((query: string) => {
        const lower = query.toLowerCase();
        setFilteredJobs(
          jobs.filter((job) => job.title.toLowerCase().includes(lower))
        );
      }, 300),
    [jobs]
  );
  useEffect(() => {
    debouncedFilter(search);
    return () => debouncedFilter.cancel();
  }, [search, debouncedFilter]);

  // Handle Job Edit, Update, and Delete
  const handleEditClick = (job: any) => {
    if (!job.id) return; // Ensure job.id is defined
    setEditingJobId(job.id!);
    setEditForm({
      title: job.title,
      description: job.description,
      skills: job.skills.join(', '),
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (jobId: string) => {
    if (!jobId) return; // Ensure jobId is defined
    try {
      const updated = {
        title: editForm.title,
        description: editForm.description,
        skills: editForm.skills.split(',').map((s) => s.trim()),
      };
      const res = await axios.put(`/api/jobs/${jobId}`, updated);
      updateJob(jobId, res.data);
      setEditingJobId(null);
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!jobId) return;
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      deleteJob(jobId);
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className='w-full mx-auto bg-white text-black shadow-lg rounded-2xl p-6 my-6'>
      <h2 className='text-2xl font-semibold mb-4'>Job Listings</h2>

      {/* Search Input */}
      <input
        className='w-full p-2 mb-4 text-white border rounded'
        type='text'
        placeholder='🔍 Search job titles...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredJobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul className='space-y-4'>
          {filteredJobs.map((job) => (
            <li
              key={job.id}
              className='border p-4 rounded-md flex flex-col gap-2'
            >
              {editingJobId === job.id ? (
                <>
                  <input
                    name='title'
                    value={editForm.title}
                    onChange={handleEditChange}
                    className='border p-2 text-white rounded'
                  />
                  <textarea
                    name='description'
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows={3}
                    className='border p-2 text-white rounded'
                  />
                  <input
                    name='skills'
                    value={editForm.skills}
                    onChange={handleEditChange}
                    className='border p-2 text-white rounded'
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleUpdate(job.id!)}
                      className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700'
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingJobId(null)}
                      className='bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500'
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className='text-xl font-bold'>{job.title}</h3>
                  <p>{job.description}</p>
                  <p className='text-sm text-gray-600'>
                    Skills: {job.skills.join(', ')}
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <button
                      onClick={() => handleEditClick(job)}
                      className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id!)}
                      className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
