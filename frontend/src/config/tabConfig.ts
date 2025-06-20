// src/config/tabConfig.ts

export interface TabItem {
  key: string;
  label: string;
  route: string;
  adminOnly?: boolean;
}

export const tabConfig: TabItem[] = [
  { key: 'resume', label: 'Resume Upload', route: '/resume' },
  { key: 'job', label: 'Job Upload', route: '/job', adminOnly: true },
  {
    key: 'applicants',
    label: 'List of Applicants',
    route: '/applicants',
    adminOnly: true,
  },
  { key: 'job-list', label: 'List of Jobs', route: '/job-list' },
  { key: 'results', label: 'View Results', route: '/results' },
];
