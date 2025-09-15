# 🚀 JobTracker - Professional Job Application Management System

A comprehensive, full-stack web application designed to streamline job application tracking and management. Built with modern technologies and best practices, this application demonstrates proficiency in contemporary web development frameworks and tools.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

JobTracker is a sophisticated job application management system that enables users to efficiently organize, track, and manage their job search process. The application provides a centralized dashboard for monitoring application statuses, deadlines, and company information while offering advanced filtering and search capabilities.

### Key Highlights

- **Full-Stack TypeScript Implementation** with type safety across the entire application
- **Server-Side Rendering (SSR)** with Next.js App Router for optimal performance
- **Secure Authentication** using Clerk with middleware protection
- **Real-time Data Management** with TanStack Query for efficient caching and synchronization
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Database Integration** with PostgreSQL and Prisma ORM

## ✨ Features

### Core Functionality

- **📊 Dashboard Analytics** - Visual statistics and insights about job applications
- **🔍 Advanced Search & Filtering** - Real-time search with case-insensitive matching
- **📝 CRUD Operations** - Create, read, update, and delete job applications
- **🏷️ Status Management** - Track application progress with color-coded status badges
- **📅 Date Tracking** - Monitor application dates and deadlines
- **🔗 URL Management** - Store and access job posting links
- **📱 Responsive Grid Layout** - Adaptive card layout (1-4 columns based on screen size)

### User Experience

- **🎨 Modern UI/UX** - Clean, intuitive interface with consistent design language
- **⚡ Real-time Updates** - Instant feedback and optimistic updates
- **🔒 Secure Authentication** - Protected routes with user session management
- **📊 Data Visualization** - Charts and statistics for application tracking
- **🌓 Theme Support** - Light/dark mode compatibility
- **♿ Accessibility** - WCAG compliant with proper ARIA labels

### Technical Features

- **🔄 Server Actions** - Modern form handling with Next.js server actions
- **📝 Form Validation** - Comprehensive validation with Zod schemas
- **🗃️ Data Persistence** - PostgreSQL database with Prisma ORM
- **🔍 Type Safety** - End-to-end TypeScript implementation
- **⚡ Performance Optimization** - Efficient querying and caching strategies

## 🛠️ Technology Stack

### Frontend Technologies

| Technology          | Purpose                              | Version |
| ------------------- | ------------------------------------ | ------- |
| **Next.js**         | React framework with SSR/SSG         | 15.5.2  |
| **React**           | UI library with hooks and context    | 19.1.0  |
| **TypeScript**      | Type safety and developer experience | ^5.0    |
| **Tailwind CSS**    | Utility-first CSS framework          | ^4.0    |
| **React Hook Form** | Form state management and validation | ^7.62.0 |
| **Zod**             | Schema validation and type inference | ^4.1.5  |

### Backend & Database

| Technology     | Purpose                            | Version |
| -------------- | ---------------------------------- | ------- |
| **Prisma**     | Modern database toolkit and ORM    | ^6.16.0 |
| **PostgreSQL** | Relational database management     | Latest  |
| **Clerk**      | Authentication and user management | ^6.31.9 |

### State Management & Data Fetching

| Technology                  | Purpose                             | Version |
| --------------------------- | ----------------------------------- | ------- |
| **TanStack Query**          | Server state management and caching | ^5.87.1 |
| **TanStack Query DevTools** | Development debugging tools         | ^5.87.3 |

### UI Components & Design

| Technology                   | Purpose                            | Version  |
| ---------------------------- | ---------------------------------- | -------- |
| **Radix UI**                 | Unstyled, accessible UI components | ^2.x     |
| **Lucide React**             | Beautiful, customizable icons      | ^0.542.0 |
| **Sonner**                   | Toast notifications                | ^2.0.7   |
| **Recharts**                 | Composable charting library        | ^3.1.2   |
| **class-variance-authority** | Component variant management       | ^0.7.1   |

### Development Tools

| Technology | Purpose                       | Version  |
| ---------- | ----------------------------- | -------- |
| **ESLint** | Code linting and formatting   | ^9.0     |
| **Day.js** | Date manipulation library     | ^1.11.18 |
| **clsx**   | Conditional className utility | ^2.1.1   |

## 🏗️ Architecture

### Project Structure

```
jobify/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── layout.tsx          # Dashboard layout with navigation
│   │   ├── add-jobs/           # Job creation page
│   │   ├── jobs/               # Jobs listing and management
│   │   └── stats/              # Analytics and statistics
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/                  # Reusable React components
│   ├── ui/                     # Base UI components (buttons, inputs, etc.)
│   ├── CreateJobForm.tsx       # Job creation form
│   ├── EditJobForm.tsx         # Job editing form
│   ├── JobCard.tsx             # Individual job display card
│   ├── JobsList.tsx            # Jobs grid container
│   ├── SearchForm.tsx          # Search and filter interface
│   └── FormComponents.tsx      # Custom form field components
├── utils/                       # Utility functions and configurations
│   ├── actions.ts              # Server actions for data operations
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Helper utilities
├── prisma/                      # Database configuration
│   └── schema.prisma           # Database schema definition
└── middleware.tsx              # Authentication middleware
```

### Data Flow Architecture

1. **Authentication Layer** (Clerk Middleware)

   - Route protection and user session management
   - Automatic redirects for unauthenticated users

2. **Client-Side State Management** (TanStack Query)

   - Server state caching and synchronization
   - Optimistic updates and error handling
   - Background refetching and cache invalidation

3. **Server Actions** (Next.js)

   - Type-safe server-side operations
   - Direct database interactions through Prisma
   - Form submission handling

4. **Database Layer** (Prisma + PostgreSQL)
   - Type-safe database operations
   - Automatic migrations and schema management
   - Optimized queries with proper indexing

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jobtracker.git
   cd jobtracker/jobify
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/jobtracker"
   DIRECT_URL="postgresql://username:password@localhost:5432/jobtracker"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/jobs
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/jobs
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage Guide

### Getting Started with JobTracker

1. **Authentication**

   - Sign up for a new account or sign in with existing credentials
   - Complete your profile setup

2. **Adding Your First Job Application**

   - Navigate to "Add Jobs" from the dashboard
   - Fill in the required information:
     - Job Title
     - Company Name
     - Location
     - Application Status
     - Employment Mode (Full-time, Part-time, Internship)
     - Date Applied
     - Job URL (optional)
   - Click "Create Job" to save

3. **Managing Applications**

   - View all applications in the "Jobs" section
   - Use the search bar to find specific applications
   - Filter by status using the dropdown menu
   - Click "Edit" on any job card to modify details
   - Delete applications using the delete button

4. **Tracking Progress**

   - Monitor application statuses with color-coded badges:
     - 🟡 **Pending** - Application submitted, awaiting response
     - 🔵 **Applied** - Application confirmed received
     - 🟣 **Interviewing** - In interview process
     - 🟢 **Offer** - Job offer received
     - 🟠 **Declined** - You declined the offer
     - 🔴 **Rejected** - Application unsuccessful

5. **Analytics and Insights**
   - Visit the "Stats" page for detailed analytics
   - View application trends and success rates
   - Monitor your job search progress over time

### Advanced Features

#### Search and Filtering

- **Real-time Search**: Type in the search box to filter jobs by title or company
- **Status Filtering**: Use the dropdown to filter by application status
- **Case-Insensitive**: Search works regardless of letter case

#### Responsive Design

- **Mobile Optimized**: Fully functional on smartphones and tablets
- **Adaptive Layout**: Grid automatically adjusts based on screen size
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 2-3 columns
  - Large Desktop: 4 columns

#### External Links

- Click the "Job URL" link on any job card to view the original job posting
- Links open in a new tab for seamless browsing

## 📚 API Documentation

### Server Actions

#### `createJobAction(values: createAndEditJobType)`

Creates a new job application in the database.

**Parameters:**

- `values`: Object containing job application data

**Returns:** `Promise<JobType | null>`

#### `getAllJobsAction(params)`

Retrieves paginated job applications with optional filtering.

**Parameters:**

- `search`: Optional search query string
- `jobStatus`: Optional status filter
- `page`: Page number for pagination

**Returns:** `Promise<{ jobs: JobType[], count: number, page: number, totalPages: number }>`

#### `getSingleJobAction(id: string)`

Retrieves a specific job application by ID.

**Parameters:**

- `id`: Unique job application identifier

**Returns:** `Promise<JobType | null>`

#### `updateJobAction(id: string, values: createAndEditJobType)`

Updates an existing job application.

**Parameters:**

- `id`: Job application identifier
- `values`: Updated job application data

**Returns:** `Promise<JobType | null>`

#### `deleteJobAction(id: string)`

Deletes a job application from the database.

**Parameters:**

- `id`: Job application identifier

**Returns:** `Promise<JobType | null>`

### Type Definitions

```typescript
type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobTitle: string;
  company: string;
  location: string;
  status: string;
  dateApplied: Date;
  mode: string;
  jobUrl: string | null;
};

enum JobStatus {
  Pending = "pending",
  Applied = "applied",
  Interviewing = "interviewing",
  Offer = "offer",
  Declined = "declined",
  Rejected = "rejected",
}

enum JobMode {
  FullTime = "fullTime",
  PartTime = "partTime",
  Internship = "internship",
}
```

## 🗃️ Database Schema

### Job Model

| Field         | Type     | Description                 | Constraints       |
| ------------- | -------- | --------------------------- | ----------------- |
| `id`          | String   | Unique identifier           | Primary key, UUID |
| `clerkId`     | String   | User identifier from Clerk  | Required          |
| `createdAt`   | DateTime | Record creation timestamp   | Auto-generated    |
| `updatedAt`   | DateTime | Last modification timestamp | Auto-updated      |
| `jobTitle`    | String   | Position/role title         | Required          |
| `company`     | String   | Company name                | Required          |
| `location`    | String   | Job location                | Required          |
| `status`      | String   | Application status          | Required          |
| `mode`        | String   | Employment type             | Required          |
| `dateApplied` | DateTime | Application submission date | Required          |
| `jobUrl`      | String   | Job posting URL             | Optional          |

### Relationships

- Each job belongs to a user (identified by `clerkId`)
- Users can have multiple job applications
- Soft deletion support for data integrity

## 🤝 Contributing

We welcome contributions to improve JobTracker! Here's how you can help:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Standards

- **TypeScript**: All new code must be properly typed
- **ESLint**: Follow the established linting rules
- **Formatting**: Use Prettier for consistent code formatting
- **Testing**: Add unit tests for new features
- **Documentation**: Update README and code comments

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage expansion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the excellent React framework
- **Clerk** for seamless authentication solutions
- **Prisma Team** for the modern database toolkit
- **Vercel** for deployment and hosting platform
- **Radix UI** for accessible component primitives
- **TanStack** for powerful state management tools

---

## 📧 Contact

**Vidyasagar Akhumukhi** - [your.email@example.com](mailto:your.email@example.com)

**Project Link** - [https://github.com/VidyasagarAkhumukhi/JobTracker](https://github.com/VidyasagarAkhumukhi/JobTracker)

**Live Demo** - [https://job-tracker-ai-tau.vercel.app/](https://job-tracker-ai-tau.vercel.app/)

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful! ⭐</strong>
</div>
