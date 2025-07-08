// src/config/tabConfig.ts
import {
  HiDocumentText,
  HiBriefcase,
  HiUsers,
  HiClipboardList,
  HiChartBar,
} from 'react-icons/hi';

export interface TabItem {
  key: string;
  label: string;
  route: string;
  icon?: React.ComponentType<any>;
  // Optional property to indicate if the tab is only visible to admins
  adminOnly?: boolean;
}
// Configuration for the tabs in the application
// This configuration can be used to dynamically render tabs in the UI
// and control access based on user roles (e.g., admin).

export const tabConfig: TabItem[] = [
  {
    key: 'resume',
    route: '/resume',
    label: 'Resume Upload',
    icon: HiDocumentText,
  },
  {
    key: 'job',
    route: '/job',
    label: 'Job Upload',
    icon: HiBriefcase,
    adminOnly: true,
  },
  {
    key: 'applicants',
    route: '/applicants',
    label: 'Applicants',
    icon: HiUsers,
    adminOnly: true,
  },
  {
    key: 'job-list',
    route: '/job-list',
    label: 'Job List',
    icon: HiClipboardList,
  },
  { key: 'results', route: '/results', label: 'Results', icon: HiChartBar },
];
