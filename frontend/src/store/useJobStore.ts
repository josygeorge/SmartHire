import { create } from 'zustand';

export interface Job {
  id?: string;
  title: string;
  description: string;
  skills: string[]; // Comma-Separated string e.g., "React, TypeScript, CSS"
}
interface JobStore {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, updatedJob: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  clearJobs: () => void;
}
export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs], // Unshift to show latest first
    })),
  updateJob: (id, updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      ),
    })),
  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),
  clearJobs: () => set({ jobs: [] }),
}));

export default useJobStore;
