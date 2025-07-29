# 🎓 Online Learning Platform

![Platform Banner](https://github.com/user-attachments/assets/d600b46e-5004-41d0-8e6d-77a302e5dc7b)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern, interactive online learning platform designed to help users master coding skills from the comfort of their homes. Built with cutting-edge technologies to provide a seamless learning experience with expert guidance and self-paced learning.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Environment Configuration](#-environment-configuration)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Project Overview

The Online Learning Platform is a comprehensive educational web application that enables users to access coding courses, tutorials, and interactive learning materials. The platform features a robust admin dashboard for content management, user authentication, payment processing, and a responsive design that works seamlessly across all devices.

### Key Objectives
- Provide accessible coding education to learners worldwide
- Create an interactive and engaging learning environment
- Enable instructors to easily manage and publish course content
- Support multiple learning formats including tutorials and hands-on projects

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Secure registration and login system with social auth integration
- **Course Management**: Comprehensive course catalog with categories and search functionality
- **Interactive Tutorials**: Step-by-step coding tutorials with syntax highlighting
- **Progress Tracking**: Monitor learning progress and achievements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Payment Integration**: Secure payment processing with Stripe

### 👨‍💼 Admin Features
- **Admin Dashboard**: Comprehensive admin panel for platform management
- **Course CRUD Operations**: Create, read, update, and delete courses
- **User Management**: Monitor and manage user accounts and activities
- **Content Management**: Manage tutorials, categories, and technologies
- **Analytics Dashboard**: Track platform usage and user engagement

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface built with Shadcn components
- **Smooth Animations**: Engaging transitions and micro-interactions with Framer Motion
- **Dark/Light Mode**: Customizable theme preferences
- **Search & Filter**: Advanced search and filtering capabilities

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Forms**: React Hook Form with Zod validation

### Backend & Database
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth with social providers
- **Storage**: Firebase Storage
- **Functions**: Firebase Functions

### Development & Build Tools
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier (via Next.js)

### Additional Libraries
- **Payment Processing**: Stripe
- **HTTP Client**: Axios
- **Code Highlighting**: React Syntax Highlighter
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## 🔧 Installation

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher
- **Firebase Account**: For database and authentication
- **Stripe Account**: For payment processing (optional)

### Step-by-Step Setup

1. **Clone the repository**
````bash
git clone https://github.com/Ameerusa86/online-learning-platform.git
cd online-learning-platform
````

2. **Install dependencies**
````bash
npm install
````

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
````bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Configuration (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
````

4. **Configure Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Add your domain to authorized domains
   - Download the configuration and update your environment variables

5. **Run the development server**
````bash
npm run dev
````

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Development Commands

````bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
````

### Project Structure

````bash
online-learning-platform/
├── app/                          # Next.js 14 app directory
│   ├── (backend Pages)/          # Admin dashboard pages
│   ├── (pages)/                  # Public pages
│   ├── hooks/                    # Custom React hooks
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── Auth/                     # Authentication components
│   ├── Cards/                    # Card components
│   ├── Nav/                      # Navigation components
│   └── ui/                       # UI components (Shadcn)
├── constants/                    # Application constants
├── hooks/                        # Shared custom hooks
├── lib/                          # Utility libraries
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
└── README.md                     # Project documentation
````

### Key Features Usage

#### For Students:
1. **Registration**: Create an account or sign in with social providers
2. **Browse Courses**: Explore available courses by category or technology
3. **Enroll in Courses**: Access course materials and tutorials
4. **Track Progress**: Monitor your learning journey and achievements

#### For Administrators:
1. **Access Admin Dashboard**: Navigate to `/admin/dashboard`
2. **Manage Courses**: Create, edit, and delete course content
3. **User Management**: Monitor user activities and manage accounts
4. **Analytics**: View platform statistics and user engagement metrics

## 🌍 Environment Configuration

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional |

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication with desired providers (Google, GitHub, Email)
3. Set up Firestore database with appropriate security rules
4. Configure Firebase Storage for file uploads
5. Add your domain to Firebase authorized domains

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
````bash
git fork https://github.com/Ameerusa86/online-learning-platform.git
````

2. **Create a feature branch**
````bash
git checkout -b feature/your-feature-name
````

3. **Make your changes**
   - Follow the existing code style and conventions
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
````bash
npm run lint
npm run build
````

5. **Commit your changes**
````bash
git commit -m "feat: add your feature description"
````

6. **Push to your branch**
````bash
git push origin feature/your-feature-name
````

7. **Create a Pull Request**
   - Provide a clear description of your changes
   - Include screenshots for UI changes
   - Reference any related issues

### Code Style Guidelines

- Use TypeScript for all new components
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement responsive design principles
- Add proper error handling and loading states

### Reporting Issues

- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include browser and device information
- Add screenshots or videos when helpful

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 📞 Contact

We'd love to hear from you! Get in touch for support, questions, or collaboration opportunities.

### Project Maintainer
- **GitHub**: [@Ameerusa86](https://github.com/Ameerusa86)
- **Email**: [Contact via GitHub](https://github.com/Ameerusa86)

### Support
- **Issues**: [GitHub Issues](https://github.com/Ameerusa86/online-learning-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ameerusa86/online-learning-platform/discussions)
- **Documentation**: Check our [Wiki](https://github.com/Ameerusa86/online-learning-platform/wiki) for detailed guides

### Community
- Star ⭐ this repository if you find it helpful
- Watch 👀 for updates and new features
- Fork 🍴 to contribute to the project

---

<div align="center">
  <p>Made with ❤️ by the Online Learning Platform Team</p>
  <p>
    <a href="#-online-learning-platform">Back to Top ↑</a>
  </p>
</div>
