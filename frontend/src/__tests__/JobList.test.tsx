// TEST 1: __tests__/JobList.test.tsx
/* import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobList from '../components/List/JobList';
import { useJobStore } from '../store/useJobStore';

// Mock Zustand store
jest.mock('../store/useJobStore', () => ({
  useJobStore: jest.fn(),
}));

describe('JobList Component', () => {
  it('shows no jobs when the store is empty', () => {
    // ✅ Provide mock return
    (useJobStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        jobs: [],
        setJobs: jest.fn(),
        deleteJob: jest.fn(),
        updateJob: jest.fn(),
      })
    );

    render(<JobList />);
    expect(screen.getByText(/No jobs available/i)).toBeInTheDocument();
  });
}); */

// TEST 2: __tests__/JobList.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobList from '../components/List/JobList';
import { useJobStore } from '../store/useJobStore';
import axios from 'axios';

jest.mock('axios');
jest.mock('../store/useJobStore');

const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Build UI components',
    skills: ['React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Backend Developer',
    description: 'Build APIs',
    skills: ['Node.js', 'Express'],
  },
];

const setJobs = jest.fn();
const deleteJob = jest.fn();
const updateJob = jest.fn();

beforeEach(() => {
  (useJobStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      jobs: mockJobs,
      setJobs,
      deleteJob,
      updateJob,
    })
  );
  jest.clearAllMocks();
});

describe('JobList', () => {
  it('renders job listings', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockJobs });
    render(<JobList />);
    expect(await screen.findByText('Job Listings')).toBeInTheDocument();
    expect(await screen.findByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  it('shows "No jobs available." when jobs list is empty', async () => {
    (useJobStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        jobs: [],
        setJobs,
        deleteJob,
        updateJob,
      })
    );
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<JobList />);
    expect(await screen.findByText('No jobs available.')).toBeInTheDocument();
  });

  it('calls setJobs on mount', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockJobs });
    render(<JobList />);
    await waitFor(() => {
      expect(setJobs).toHaveBeenCalledWith(mockJobs);
    });
  });

  it('enters edit mode and updates a job', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockJobs });
    (axios.put as jest.Mock).mockResolvedValue({
      data: { ...mockJobs[0], title: 'Updated Title' },
    });
    render(<JobList />);
    const editButtons = await screen.findAllByText('Edit');
    fireEvent.click(editButtons[0]);
    const titleInput = screen.getByDisplayValue('Frontend Developer');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
      expect(updateJob).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ title: 'Updated Title' })
      );
    });
  });

  it('cancels editing', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockJobs });
    render(<JobList />);
    const editButtons = await screen.findAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    expect(
      screen.queryByDisplayValue('Frontend Developer')
    ).not.toBeInTheDocument();
  });

  it('deletes a job', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockJobs });
    (axios.delete as jest.Mock).mockResolvedValue({});
    render(<JobList />);
    const deleteButtons = await screen.findAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/jobs/1');
      expect(deleteJob).toHaveBeenCalledWith('1');
    });
  });
});
