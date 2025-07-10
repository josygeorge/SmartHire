## 📅 SmartHire Project Changelog

> 🎯 Project Duration: **May 27, 2025 – June 20, 2025**
> ⚙️ Post-MVP Development & Troubleshooting: **June 28, 2025 – Till Date**

---

## [1.2.0] - 2025-07-06

### ✨ 2025-07-09 - Collapsible Sidebar & Theme Improvements

- **Collapsible Sidebar with Dark/Light Theme:**
  - Built a left-side collapsible sidebar using TailwindCSS with integrated icons.
  - Added animated toggle for collapse/expand, active tab highlighting, and hover tooltips when collapsed.
  - Implemented a dark/light mode switch (🌙 / ☀️), with theme preference persisted in `localStorage`.
  - Utilized `clsx` and `tailwind-merge` for clean conditional styling.
- **Theme Styling Fixes:**
  - Resolved conflicting dark/light colors in buttons, form input fields, and backgrounds.
  - Addressed Tailwind's default button background-color and text-color overrides from `index.css` by commenting out the problematic `background-color` for button elements.
  - Cleaned up input styles for proper border and text color across both themes.

### ✨ 2025-07-08 - Sidebar Menu & Settings Dropdown

- `feat`: Added Collapsible sidebar menu for tab navigation.
- `ui`: Implemented animated expand/collapse behavior, hover tooltips in collapsed state, and full-width buttons for cleaner layout.
- `refactor`: Adjusted sidebar layout to integrate seamlessly with the floating header.
- `changed`: Replaced previous horizontal navigation with a vertical sidebar for improved usability and space efficiency.
- `feat`: Added Settings dropdown with gear icon to header (displays user email + logout option).
- `ui`: Applied Tailwind styling and implemented click-outside dropdown logic with conditional rendering.

### 🐛 2025-06-28 to 2025-07-02 - Path Collision & Redirection Bug Fix

- `fix`: Resolved Zustand hydration issue affecting initial route rendering.
- `fix`: Fixed path collision bug after SignIn/SignUp that caused blank screens and navigation throttling.
- `refactor`: Simplified protected route and app-level redirect logic for robustness.
- `test`: Verified role-based access and routing functionality post-hydration.

---

### 🚀 2025-06-20 - Project Finalization & Cleanup

- `feat`: Implemented role-based tab visibility in `App.tsx`.
- `refactor`: Modularized tab rendering logic for better maintainability.
- `feat`: Added auto-deletion of orphaned screening results before frontend load.
- `docs`: Professional polish of the `README.md` file.
- `fix`: Clarified Resend API domain limitation (sandbox vs. custom domain).

### ✨ 2025-06-19 - Interview Features & PDF Fix

- `feat`: Implemented display of interview questions with copy-to-clipboard functionality and First/Last pagination.
- `fix`: Patched `pdf-parse` import bug using `patch-package`.
- `chore`: Applied temporary fix for `pdf-parse` ENOENT error.
- `docs`: Updated `README` with Resend sandbox notes and enhancements.

### ✨ 2025-06-17 to 2025-06-18 - Full Password Reset Flow

- `feat`: Developed complete password reset flow with Resend (API + Frontend).
- `fix`: Handled `ForgotPassword` and `ResetPassword` route handling, including Resend verification.
- `test`: Postman-tested all authentication-related endpoints (forgot/reset).

### ✨ 2025-06-14 to 2025-06-16 - Frontend & Backend Authentication

- `feat`: Implemented frontend authentication (SignIn/SignUp), protected routes, and Zustand store for user/admin roles.
- `feat`: Developed middleware and backend authentication with token-based role control.
- `feat`: Completed frontend flow for forgot password (form + routing).
- `fix`: Resolved authentication routing bug when no token was present.
- `test`: Tested authentication flow using Postman.

### 🧪 2025-06-12 to 2025-06-13 - Testing, Forms & Data Management

- `test`: Conducted unit testing using Jest + React Testing Library (RTL) for `JobList`.
- `feat`: Integrated React Hook Form with Yup validation.
- `feat`: Implemented debounced job search functionality and pagination.
- `feat`: Developed backend function to delete orphaned screening results.
- `docs`: Updated `README` with feature list and AI agent details.

### ✨ 2025-06-09 to 2025-06-11 - AI Screening & Results Viewer

- `feat`: Implemented AI screening via Mistral on OpenRouter.
- `feat`: Enabled storing screening results and viewing AI feedback on the frontend.
- `fix`: Centralized Zustand store for Jobs and Applicants.
- `fix`: Resolved `ResultsViewer` fetch crash (handled 304 status).
- `feat`: Added screening results viewer with pagination.

### ⚙️ 2025-06-04 - Core Models & Routes

- `feat`: Developed Job model, controller, and routes.
- `feat`: Developed ScreeningResult model, controller, and routes.
- `fix`: Updated `App.ts` route imports for consistency.

### ✨ 2025-06-03 - Resume PDF Upload

- `feat`: Implemented Resume PDF upload with size limit and parsing to MongoDB.

### 🐛 2025-05-30 - Applicant Upload Fixes

- `fix`: Corrected Applicant resume upload via Multer – added support for PDF/TXT.
- `test`: Tested resume insert and parse via Postman.

### ✨ 2025-05-29 - Frontend Resume Form

- `feat`: Created and connected frontend resume upload form.
- `chore`: Cleaned root directory, removed `.DS_Store`, and updated `.gitignore`.

### ⚙️ 2025-05-28 - Initial Server & Applicant Setup

- `feat`: Initial Express server setup.
- `feat`: Applicant model, controller, routes, and database setup.
- `test`: HTTP tested via Postman (CRUD for Applicants).

### 🚀 2025-05-27 - Project Kickoff

- `init`: SmartHire project initialized (MERN + AI Resume Screener).

---

## ✅ Project Status

🎯 **MVP complete. Ready for deployment.**
Next: Deploy to **Vercel (frontend)** and **Render (backend)**. Planning scaling and advanced features (e.g., analytics, multi-role admin views, or LLM switching).
