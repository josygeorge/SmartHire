# 🧠 SmartHire – An AI-Powered Hiring Assistant

SmartHire is a full-stack MERN application that leverages **Agentic AI** (via OpenRouter + Mistral) to intelligently screen resumes, match them to job descriptions, and generate tailored interview questions, insights, and scores.

Built with scalability, modern UI/UX, and clean architecture in mind.

---

## 🌐 Live Demo

- 🔗 **Frontend**: [smart-hire-rho.vercel.app](https://smart-hire-rho.vercel.app) – _(Ctrl/⌘ + Click to open in new tab)_
- 🔗 **API**: [smarthire-api.onrender.com](https://smarthire-api.onrender.com) – _(Ctrl/⌘ + Click to open in new tab)_

- 🎥 **Demo Video**: _Coming soon_

---

## 📅 Project History

📖 A complete history of daily development progress, feature additions, and fixes is available in the [CHANGELOG.md](./CHANGELOG.md).

It highlights how SmartHire evolved from setup to full-stack deployment over an 18-day period.

---

## 🛠️ Tech Stack

| Layer          | Technologies                                        |
| -------------- | --------------------------------------------------- |
| 🖥️ Frontend    | React, TypeScript, Zustand, Vite                    |
| 💻 Desktop App | Electron (frontend wrapper)                         |
| 🔙 Backend     | Node.js, Express, TypeScript                        |
| 🗃️ Database    | MongoDB Atlas                                       |
| 🤖 AI Agent    | OpenRouter (Model: `mistralai/devstral-small:free`) |
| 📎 File Upload | Multer (PDF/TXT resume support)                     |
| ☁️ Deployment  | Vercel (frontend), Render (backend)                 |
| 🧪 Testing     | Jest, React Testing Library, Postman                |

---

## ✅ Features

- Upload and parse resumes (PDF/TXT)
- Create, Edit, and Delete job postings
- **AI-powered resume screening** (matches resumes to jobs)
- Auto-generated interview questions based on role fit
- View, copy, and paginate AI-generated results
- Debounced search and memoized rendering for performance
- Role-based access control (`admin` vs `user`)
- Protected routes and authentication
- "Forgot Password" flow using **Resend API**
- Clean up orphaned results from deleted jobs or resumes
- **Collapsible Sidebar** with Dark/Light theme toggle
- Settings dropdown in header with user email + logout

---

## 📦 Feature Progress

| Module                | Status  | Description                                                      |
| --------------------- | ------- | ---------------------------------------------------------------- |
| 🧑‍💼 Resume Upload      | ✅ Done | Resume upload via Multer + `pdf-parse`                           |
| 💼 Job Management     | ✅ Done | Full CRUD with inline edit/delete                                |
| 🧠 AI Screening       | ✅ Done | Resume-to-job matching with insights and scores                  |
| 📊 Screening Viewer   | ✅ Done | Displays results with pagination, copy-to-clipboard, etc.        |
| 🔐 Authentication     | ✅ Done | Role-based sign-up/login + route protection                      |
| 🧪 Unit/API Testing   | ✅ Done | Jest + RTL + mocked Zustand store for components like `JobList`  |
| 🧹 Orphan Cleanup     | ✅ Done | Removes results with missing job or applicant                    |
| 🧾 Interview Q UX     | ✅ Done | Generates role-specific questions, easy to copy/share            |
| 📚 Sidebar Navigation | ✅ Done | Left sidebar with active tab highlight, tooltips, and animations |
| ⚙️ Header Settings    | ✅ Done | Dropdown for user email and logout icon                          |

---

## 🎨 Recent UI/UX Enhancements

### 🗓️ July 9, 2025 – Dark/Light Theme + Sidebar

- ✅ **Sidebar**: Collapsible, animated, tooltipped, and role-aware.
- ✅ **Theme Toggle**: Toggle between dark and light themes; persisted in `localStorage`.
- ✅ **Header Settings**: Gear icon dropdown for user info and logout.
- ✅ **Fixed Styling Conflicts**: Removed hardcoded dark colors in `index.css`, making Tailwind theming dynamic.

### 🗓️ June 28 – July 2, 2025 – Redirect Bug Fix

- ❌ **Issue**: Confusing navigation after SignUp/SignIn due to Zustand store hydration delays.
- ✅ **Fix**: Delayed redirection until the store is hydrated; fixed root path logic.

---

## 🧪 Testing Strategy

### ✅ Covered Scenarios

- No jobs available (empty state)
- Rendering list with mock data
- Edit/save/cancel flow
- Delete confirmation with store updates

### 🔍 Technologies

- Jest
- React Testing Library
- Mocked Zustand store
- Stubbed Axios calls

```bash
npm run test
# or
npm run test:watch
```

### 🔑 Authentication & Email Flow

    ✉️ Forgot Password: Integrated with Resend API

    🛠️ Demo mode: Only sends to developer inbox (onboarding@resend.dev)

    🌐 Ready for Production: Easily upgradable with custom domain integration

## 🧠 Project Summary

    SmartHire demonstrates real-world full-stack capabilities under tight constraints.

    Clean modular architecture

    Integration with real AI APIs (OpenRouter)

    Secure, role-based user flows

    Thoughtful UI/UX with modern Tailwind design

    Deployment-ready and demo-ready

### 📸 Screenshots (to be added)

    Home Page

    Screening Results

## 🤝 Want to Contribute or Collaborate?

Fork it, improve it, or reach out!

---
