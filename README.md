# 🧠 SmartHire – an AI-Powered Assistant

> **SmartHire** is a full-stack MERN application that uses Agentic AI (powered by Mistral via OpenRouter) to screen resumes, match them against job descriptions, and generate role-specific interview questions, scores, and summaries. Built with scalability, clean code, and modular design in mind.

---

## 🚀 Live Demo

- 🌐 **Frontend:** [smarthire.vercel.app](https://smarthire.vercel.app)
- 🌐 **API:** [smarthire-api.onrender.com](https://smarthire-api.onrender.com)
- 📽️ **Demo Video:** _Coming soon_

---

## 📅 Project History

📖 A complete history of daily development progress, feature additions, and fixes is available in the [CHANGELOG.md](./CHANGELOG.md).  
It highlights how SmartHire evolved from setup to full-stack deployment over an 18-day period.

---

## 🛠️ Tech Stack

| Layer          | Tech Stack                                          |
| -------------- | --------------------------------------------------- |
| 🖥️ Frontend    | React, TypeScript, Zustand, Vite                    |
| 💻 Desktop App | Electron (Wrapper for Frontend UI)                  |
| 🔙 Backend     | Node.js, Express, TypeScript                        |
| 🗃️ Database    | MongoDB Atlas                                       |
| 🤖 AI Agent    | OpenRouter (Model: `mistralai/devstral-small:free`) |
| 📎 File Upload | Multer                                              |
| ☁️ Deployment  | Vercel (frontend), Render (backend)                 |
| 🧪 Testing     | Jest, React Testing Library, Postman                |

---

## 📦 Features

- ✅ Upload and parse resumes (PDF/TXT)
- ✅ Create, edit, and delete job postings
- ✅ AI-powered resume screening and scoring
- ✅ Auto-generated interview questions
- ✅ Search + pagination in Screening Results
- ✅ Copy-to-clipboard for interview Q\&A
- ✅ Debounced search & memoized rendering
- ✅ Role-based tabs & protected routes (Admin/User)
- ✅ “Forgot Password” email flow using Resend API
- ✅ Deletes orphaned screening results (missing job/applicant)
- ✅ Fully deployed with secure authentication & modern UX

---

## ✅ Feature Progress

| Module                      | Status  | Description                                                              |
| --------------------------- | ------- | ------------------------------------------------------------------------ |
| 🧑‍💼 Resume Upload            | ✅ Done | Resumes uploaded via Multer and parsed using `pdf-parse`                 |
| 💼 Job Management           | ✅ Done | Full CRUD with inline editing and deletion                               |
| 🧠 Agentic AI Screening     | ✅ Done | Matches resumes to jobs with strengths, weaknesses, scores, and insights |
| 📊 Screening Results Viewer | ✅ Done | Displays AI screening output with pagination & clipboard feature         |
| 🔐 Authentication           | ✅ Done | Secure SignUp / SignIn + role-based routing + protected routes           |
| 🧪 Unit & API Testing       | ✅ Done | JobList tested using Jest + React Testing Library                        |
| 🧹 Orphan Cleanup           | ✅ Done | Frontend triggers deletion of results with missing job/applicant links   |
| 🧾 Interview Question UX    | ✅ Done | Automatically generated, role-based, and copied with one click           |

---

## 🔬 Testing Strategy

🧪 **Unit Tested:** `JobList` Component

- Zustand Store mocked
- Axios calls stubbed
- Jest + RTL used for UI logic and state tests

### ✅ Covered Test Cases:

- No jobs available (empty state)
- Job list rendered with mock data
- Edit/save flow
- Cancel edit mode
- Delete job and confirm store update

### 🧪 Run Tests

```bash
npm run test
# or
npm run test:watch
```

---

## 🔑 Authentication & Email Flow

### 🔒 Forgot Password via Resend API

- Current Mode: **Sandboxed** to a verified developer email
- Limit: Emails can only be sent to developer inbox (`onboarding@resend.dev`)
- Demo-Ready: Works fully in deployed environments (Vercel + Render)
- Future-Ready: Easily upgradable with custom domain for all-user email access

> **ℹ️ Note:** This is a conscious trade-off to demonstrate email functionality without requiring a domain purchase.

---

## 🖼️ Screenshots

> _Add screenshots after deployment to production_

```md
![Home Page](screenshots/home.png)
![Screening Results](screenshots/screening.png)
```

---

## 🧠 Project Summary

SmartHire demonstrates strong capabilities in:

- Full-stack MERN development
- AI integration with external APIs (OpenRouter)
- Secure and modular authentication flow
- File handling and dynamic resume parsing
- Thoughtful UI/UX with search, pagination, and feedback loops
- Clean code, modular routing, and well-commented components

---

## 📢 End Notes

> "SmartHire reflects real-world application design under time constraints (3–4 hours/day for 18 days). The development flow balances innovation with practical MVP delivery."

Want to collaborate, improve, or integrate? Feel free to fork or get in touch!

---

Let me know if you'd like help adding screenshots, your LinkedIn/GitHub/contact links, or a “Contributing” section!
