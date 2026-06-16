<div align="center">
  <img src="https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png" alt="NayePankh Logo" width="200" />
  <h1>NayePankh Volunteer Management System (NVMS)</h1>
  <p><em>"Empowering Volunteers. Strengthening Communities."</em></p>
</div>

<hr />

## 🌟 The Core Idea

The NayePankh Volunteer Management System is a comprehensive, centralized digital platform designed to bridge the gap between passionate volunteers and community service initiatives. 

Historically, non-governmental organizations (NGOs) rely on fragmented systems—spreadsheets, emails, and manual paperwork—to track volunteer registrations, manage approvals, and distribute resources. **NVMS solves this by providing a fully automated, end-to-end MERN stack web application.** It offers a seamless public-facing portal for onboarding, a dedicated dashboard for active volunteers to track their impact, and a powerful administrative hub for the NGO leadership to manage thousands of applications at scale.

## 🚀 Why This Platform is Better

- **Frictionless Onboarding:** Replaces tedious email back-and-forths with an intuitive, 3-step dynamic registration flow. 
- **Automated Identity Generation:** The system automatically generates standardized, unique Volunteer ID Codes (e.g., `NVMS-284910`) upon approval, giving volunteers immediate official recognition.
- **Role-Based Security:** Engineered with strict Role-Based Access Control (RBAC). A standard volunteer cannot access analytics, whereas authorized Administrators have full command over data visibility and user statuses.
- **Monolithic Yet Modern:** Architected as a modern monolithic repository, it combines a highly responsive React/Vite frontend with a robust Node.js backend. This allows for lightning-fast deployments while maintaining clean separation of concerns.
- **Data at Your Fingertips:** Features a built-in Analytics Engine and one-click CSV export functionality, transforming raw volunteer data into actionable insights for stakeholders.

## ⚙️ Core Functions

### For the Public & Volunteers
- **Beautiful Landing Page:** Information regarding the foundation, its mission, and its impact.
- **Interactive Registration:** Secure signup form capturing demographics, educational background, skills, and availability.
- **Volunteer Dashboard:** A private workspace to view application status, receive administrative notifications, and update profile information (like uploading a resume or photo).

### For Administrators
- **Global Table View:** Sort, search, and manage all volunteer applications in a single unified interface.
- **Application Workflows:** 1-click approvals and rejections that automatically notify the end-user.
- **Analytics & Exports:** Real-time KPI dashboards calculating approval ratios and an export engine to download the database into a CSV spreadsheet.
- **Admin Management:** Securely create new administrator accounts for internal staff directly from the UI.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Redux Toolkit, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Security:** JWT (JSON Web Tokens) stored in HTTP-only cookies, bcrypt password hashing, and strict route protection.

---

## 📦 Installation & Setup

1. **Clone the repository**
2. **Setup Environment Variables:**
   Copy `.env.example` to `server/.env` and fill in the database details.
3. **Install Dependencies & Run Locally:**

```bash
# Install all dependencies and build the frontend
npm run build

# Start the development server
cd server && npm run dev
```

---

## 🚀 Deployment (Render.com)

This repository is pre-configured for a seamless **monolithic deployment** on Render. The Node.js backend will automatically host and serve the compiled React frontend.

1. **Create a Web Service on Render:**
   - Connect your GitHub repository.
   - **Root Directory:** `.` *(leave blank)*
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   
2. **Environment Variables:**
   Add all variables directly into the Render Environment tab.
   - **CRITICAL:** Set `NODE_ENV=production`

Render will automatically install all dependencies, build the Vite frontend, and spin up the Express server!
