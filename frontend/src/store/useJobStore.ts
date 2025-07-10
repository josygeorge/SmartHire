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
  setJobs: (data: any[]) =>
    set({
      jobs: data.map((job) => ({
        ...job,
        id: job._id, // Convert Mongo _id to id
      })),
    }),

  addJob: (job: any) =>
    set((state) => ({
      jobs: [{ ...job, id: job._id }, ...state.jobs],
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
