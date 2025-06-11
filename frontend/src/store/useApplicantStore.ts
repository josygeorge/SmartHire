import { create } from 'zustand';

export interface Applicant {
  _id?: string; // backend MongoDB might return this
  name: string;
  email: string;
  resumeText: string;
}

interface ApplicantStore {
  applicants: Applicant[];
  setApplicants: (data: Applicant[]) => void;
  addApplicant: (applicant: Applicant) => void;
  updateApplicant: (id: string, updatedApplicant: Partial<Applicant>) => void;
  deleteApplicant: (id: string) => void;
  clearApplicants: () => void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  applicants: [],
  setApplicants: (data) => set({ applicants: data }),
  addApplicant: (applicant) =>
    set((state) => ({
      //applicants: [...state.applicants, applicant], // pushing new applicants to the end - gives consistent ordering
      applicants: [applicant, ...state.applicants], // For better UX (e.g. show newest first) unshifting
    })),
  updateApplicant: (id, updatedApplicant) =>
    set((state) => ({
      applicants: state.applicants.map((applicant) =>
        applicant._id === id ? { ...applicant, ...updatedApplicant } : applicant
      ),
    })),
  deleteApplicant: (id) =>
    set((state) => ({
      applicants: state.applicants.filter((applicant) => applicant._id !== id),
    })),
  clearApplicants: () => set({ applicants: [] }), // This is useful for resetting the store, e.g. after a successful submission
}));
