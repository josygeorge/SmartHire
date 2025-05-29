import { create } from 'zustand';

export interface Applicant {
  _id?: string; // backend MongoDB might return this
  name: string;
  email: string;
  resumeText: string;
}

interface Store {
  applicants: Applicant[];
  setApplicants: (data: Applicant[]) => void;
  addApplicant: (applicant: Applicant) => void;
  clearApplicants: () => void;
}

export const useApplicantStore = create<Store>((set) => ({
  applicants: [],
  setApplicants: (data) => set({ applicants: data }),
  addApplicant: (applicant) =>
    set((state) => ({
      applicants: [...state.applicants, applicant],
    })),
  clearApplicants: () => set({ applicants: [] }),
}));
