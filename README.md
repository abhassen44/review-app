# 🌟 Review App
A modern Next.js application for message management and reviews with AI-powered features.
## 📑 Table of Contents
- [🌟 Review App](#-review-app)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
    - [Core Functionality](#core-functionality)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Frontend Architecture](#frontend-architecture)
    - [Backend Services](#backend-services)
    - [AI Components](#ai-components)
  - [📦 Prerequisites](#-prerequisites)
  - [🧾 Environment](#-environment)
  - [🧑‍💻 Installation](#-installation)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [4. Start the development server](#4-start-the-development-server)
- [🗂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
## 🚀 Features
### Core Functionality
1. 🔐 **Authentication System**
   - Email-based secure login
   - NextAuth session management
   - Email verification
2. 💬 **Message Management**
   - Category-based organization (General, Feedback, Question, Other)
   - Tag support
   - Chronological sorting
   - Category filtering
   - Content search
   - Safe deletion with confirmation
3. 🤖 **AI Integration**
   - GPT-4 Turbo powered suggestions
   - 30-second streaming responses
   - Triple question generation
   - Content moderation
   - Safe conversation focus
4. 📩 **Message Delivery**
   - Direct user messaging
   - Message control (accept/decline)
   - Timestamp tracking
   - Availability management
   - Error handling system
5. 💻 **User Interface**
   - Responsive design
   - Real-time updates
   - Toast notifications
   - Loading states
   - Shadcn UI components
## 🛠️ Tech Stack
### Frontend Architecture
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Shadcn UI
### Backend Services
- MongoDB + Mongoose
- NextAuth.js
- Zod
- Axios
### AI Components
- OpenAI GPT-4 Turbo
- AI SDK (streaming)
- Content moderation
## 📦 Prerequisites
- Node.js v18+
- MongoDB database
- SMTP email service (Resend)
- OpenAI API key
## 🧾 Environment

Before running the application, create a `.env` file at the root of your project and add the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email@domain.com

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```
---
## 🧑‍💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your/repo.git
cd your-repo
```

### 2. Install dependencies
```bash
pnpm install
```



### 4. Start the development server
```bash
pnpm dev
```

---
# 🗂 Project Structure 
```
src/
├── app/          # Next.js pages and API routes
│   └── api/      # Endpoints for AI and messages
├── components/   # Reusable React components
├── context/      # Context providers for global state management
├── hooks/        # Custom hooks for reusable logic
├── lib/          # Utility functions and configuration files
└── model/        # MongoDB schemas & types
```


---
# 🤝 Contributing
We welcome all contributions!
Please feel free to open issues or submit pull requests to help improve this project.

---
# 📄 License
This project is licensed under the MIT License.


