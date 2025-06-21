# 🧠 SmartHire

> **SmartHire** is an AI-powered resume screener and interview assistant built with the M.E.R.N. stack. It leverages Agentic AI using the Mistral LLM via OpenRouter to analyze resumes, match them against job descriptions, and generate screening summaries, candidate scores, and role-specific interview questions.

---

## 🚀 Live Demo

🌐 Frontend: [https://smarthire.vercel.app](https://smarthire.vercel.app)  
🌐 API: [https://smarthire-api.onrender.com](https://smarthire-api.onrender.com)  
📽️ Demo Video: _Coming soon_

---

## 🛠️ Tech Stack

| Layer | Tech Stack
|🖥️ Frontend | React, TypeScript, Zustand, Vite
|🔙 Backend | Node.js, Express, TypeScript
|🗃️ Database | MongoDB Atlas
|🤖 AI Agent | OpenRouter with Model: 'mistralai/devstral-small:free'
|📎 File Upload | Multer
|☁️ Deployment | Vercel (frontend), Render (backend)
|🧪 Testing | Jest, React Testing Library, Postman

---

## 📦 Features

- 🔍 Upload and parse resumes
- 📌 Create and manage job descriptions
- 🧠 AI-based resume screening and scoring
- 📝 Auto-generated interview questions
- 🧪 Tested with Jest & React Testing Library
- ⚡️ Debounced search input and memoized rendering
- ✅ Form validation with React Hook Form + Yup
- 🔑 User Authentication: Secure Sign Up and Sign In and a secure 'Forgot Password' flow powered by the Resend API
- ☁️ Deployed to Render and Vercel

---

### ✅ **Current Status in SmartHire (MERN + Agentic AI Resume Screener)**

> **Feature Progress Overview:** 90% Complete

| Feature / Module              | Status  | Notes                                                                                      |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| 🧑‍💼 Applicant Upload           | ✅ Done | Resume stored via Multer                                                                   |
| 📄 Resume Parsing             | ✅ Done | Using `pdf-parse`                                                                          |
| 💼 Job Creation               | ✅ Done | CRUD                                                                                       |
| 🤖 AI Screening Integration   | ✅ Done | Match score + analysis via OpenRouter + Mistral                                            |
| 📊 Screening Results Viewer   | ✅ Done | `ScreeningResults` collection + frontend UI completed                                      |
| 🔬 Unit Testing               | ✅ Done | `JobList` tested with Jest + React Testing Library + Zustand mock                          |
| 🧠 Zustand State Management   | ✅ Done | Store implemented for jobs + screening results                                             |
| 🧪 API + Component Testing    | ✅ Done | Tested Job CRUD, AI feedback, and empty state rendering                                    |
| 🔑 User Authentication        | ✅ Done | Secure Sign Up and Sign In, including **Forgot Password flow** using **Resend API**        |
| 📋 Interview Questions UX     | ✅ Done | Interview questions displayed in ResultsViewer, with **Copy to Clipboard** feature         |
| ⏮️ ⏭️ Pagination Enhancements | ✅ Done | **First** and **Last** buttons added to ResultsViewer pagination                           |
| 🧹 Delete Orphaned Results    | ✅ Done | Removes results with missing `applicantId` or `jobId` — helpful for cleaning up stale data |

---

# Testing using Jest - React Library

✅ Unit Testing: JobList Component

The JobList component is fully covered with unit tests using Jest and React Testing Library, with proper mocking of both Zustand store and Axios for API interactions.
🧪 Testing Setup Highlights

    ✅ Zustand store (useJobStore) successfully mocked

    ✅ Axios HTTP requests stubbed using Jest

    ✅ tsconfig configured with:

        jsx: react-jsx

        esModuleInterop: true (to avoid import issues)

    ✅ Jest environment set up with jest-environment-jsdom for DOM simulation

🔍 Test Cases Covered

    ✅ Renders "No jobs available" when store is empty

    ✅ Renders job listings correctly with mock data

    ✅ Edits a job and updates state on "Save"

    ✅ Cancels edit mode and reverts UI changes

    ✅ Deletes a job and confirms store update

# 🧪 How to Run Tests

npm run test

# or watch mode

npm run test:watch

## “Note: Email delivery is currently sandboxed via Resend to a verified developer email for demonstration purposes. Full email delivery can be unlocked by attaching a custom domain.”

📧 Forgot Password (Email Reset Flow)

SmartHire uses Resend for sending password reset emails.

    Current Mode: Sandbox mode with a verified developer email (onboarding@resend.dev).

    Purpose: Demonstrates working email reset functionality in both development and deployed (production) environments.

    Limitation: Emails can only be sent to the developer’s verified address due to sandbox restrictions.

    ** Future Ready: Easily upgradable by verifying a custom domain (e.g., smarthire.com) to allow sending emails to all users.

    ⚙️ The system is built to scale — switching to a full custom domain (via Resend or any SMTP provider like SendGrid) is seamless and only requires DNS configuration.

## Comments

> "The project planned sequence strikes a good balance between functionality, performance, and polish."
> "That’s a solid and well-prioritized plan, especially for a 3-day sprint with 3–4 hours/day."

## 📸 Screenshots

> Add real screenshots here after deployment:

```md
![Home Page](screenshots/home.png)
![Screening Results](screenshots/screening.png)
```
