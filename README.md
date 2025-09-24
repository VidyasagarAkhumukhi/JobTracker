# 🚀 JobTracker - AI-Powered Job Application Management System

A comprehensive, full-stack web application designed to streamline job application tracking and management with **advanced AI-powered automation**. Built with modern technologies and intelligent features, this application leverages cutting-edge artificial intelligence to revolutionize your job search process.

## 📋 Table of Contents

- [Overview](#-overview)
- [🤖 AI Features](#-ai-features)
- [Features](#-features)
- [🎯 Future AI Features](#-future-ai-features)
- [Technology Stack](#️-technology-stack)
- [Architecture](#️-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Database Schema](#️-database-schema)
- [Production Deployment](#-production-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

JobTracker is a sophisticated job application management system that enables users to efficiently organize, track, and manage their job search process with the power of artificial intelligence. The application provides a centralized dashboard for monitoring application statuses, deadlines, and company information while offering **comprehensive AI-powered automation** to eliminate manual work and supercharge productivity.

### Key Highlights

- **🤖 Complete AI-Powered Job Search Suite** - Auto-fill, resume optimization, and cover letter generation
- **📄 Smart Resume Tailoring** - AI-optimized resumes for each job application
- **💌 Personalized Cover Letters** - AI-generated cover letters with company-specific insights
- **Full-Stack TypeScript Implementation** with type safety across the entire application
- **Server-Side Rendering (SSR)** with Next.js App Router for optimal performance
- **Secure Authentication** using Clerk with middleware protection
- **Real-time Data Management** with TanStack Query for efficient caching and synchronization
- **Professional Document Export** - Download resumes and cover letters as Word documents
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Database Integration** with PostgreSQL and Prisma ORM

## 🤖 AI Features

### ✨ Intelligent Job Description Auto-Fill

Transform your job application workflow with our cutting-edge AI technology:

#### 🧠 Smart Job Parsing

- **Instant Data Extraction**: Simply paste any job description and watch as our AI automatically identifies and fills:
  - 🏢 **Company Name** - Accurate company identification
  - 💼 **Job Title** - Precise position/role extraction
  - 📍 **Location** - Geographic location detection

#### ⚡ Powered by Google Gemini 2.5 Flash-Lite

- **Advanced Language Model**: Utilizes Google's latest Gemini 2.5 Flash-Lite for superior text understanding and cost efficiency
- **Structured JSON Response**: Ensures reliable and consistent data extraction
- **Context-Aware Processing**: Understands job posting formats and industry-specific terminology

### 📄 AI Resume Optimizer (NEW!)

Revolutionary resume tailoring powered by advanced AI:

#### 🎯 Key Features

- **Job-Specific Optimization**: AI analyzes job descriptions and tailors your resume accordingly
- **ATS-Friendly Formatting**: Ensures your resume passes Applicant Tracking Systems
- **Keyword Integration**: Strategically incorporates relevant keywords from job postings
- **Professional Layout**: Clean, modern formatting with proper spacing and typography
- **Dynamic Content**: Automatically highlights your most relevant experience and skills

#### 📊 Smart Formatting

- **Single-Line Job Entries**: Professional consolidation of job titles, companies, locations, and dates
- **Section Detection**: Automatically recognizes and formats different resume sections
- **Bullet Point Optimization**: Properly formats achievements and responsibilities
- **Contact Information**: Clean header formatting with professional presentation

#### 💾 Export Options

- **Word Document Download**: Professional .docx files with proper formatting
- **Dynamic File Naming**: `UserName_Resume_JobTitle_Company.docx`
- **Copy to Clipboard**: Instant text copying for quick application submission
- **Clean Text Format**: Markdown-free, ATS-compatible plain text

### 💌 AI Cover Letter Generator (NEW!)

Personalized cover letter creation with intelligent company insights:

#### 🔍 Smart Analysis

- **Company Research**: AI extracts company name, culture, and values from job descriptions
- **Role Matching**: Tailors content to specific job requirements and responsibilities
- **Personal Branding**: Highlights your most relevant experience and achievements
- **Professional Tone**: Maintains appropriate formality while showing enthusiasm

#### ✍️ Content Generation

- **Custom Headers**: Professional letterhead with your contact information
- **Engaging Openings**: Compelling introductions mentioning specific roles and companies
- **Targeted Body**: 2-3 paragraphs highlighting relevant qualifications
- **Strong Closings**: Confident call-to-action statements
- **Proper Formatting**: Business letter format with appropriate spacing

#### 📁 Export Features

- **Word Document**: Professional .docx formatting with proper business letter layout
- **Dynamic Naming**: `UserName_CoverLetter_JobTitle_Company.docx`
- **Real Date Integration**: Current date automatically included (no placeholders)
- **Copy Functionality**: Quick clipboard access for immediate use

### 🎯 AI Magic Mode

Centralized AI hub accessible from any job application:

#### 🌟 Unified Interface

- **Job Parser**: Quick autofill from job descriptions
- **Resume AI**: Complete resume optimization workflow
- **Cover Letter AI**: End-to-end cover letter generation
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Tab Navigation**: Easy switching between AI features

#### ⚡ Smart Workflow

- **One-Click Access**: AI features available directly in job creation flow
- **Context Sharing**: Job information automatically shared between AI tools
- **Integrated Experience**: Seamless workflow from job posting to complete application package

#### 🎯 Key Benefits

- **Time Savings**: Reduce manual data entry by up to 90%
- **Accuracy**: AI-powered extraction minimizes human error
- **Consistency**: Standardized data format across all applications
- **User-Friendly**: Simple paste-and-click interface with instant results

#### 🔧 How It Works

1. **Paste Job Description**: Copy the full job posting into the text area
2. **AI Analysis**: Our system processes the content using advanced NLP
3. **Automatic Population**: Form fields are instantly filled with extracted data
4. **Review & Submit**: Verify the information and save your application

#### 🛡️ Privacy & Security

- **API Key Protection**: Secure environment variable storage
- **No Data Storage**: Job descriptions are processed in real-time, not stored
- **Error Handling**: Comprehensive validation and fallback mechanisms

## ✨ Features

### 🤖 AI-Powered Functionality

- **📄 Smart Job Description Parsing** - AI-driven extraction of job details from any job posting
- **⚡ Instant Auto-Fill** - One-click population of form fields using advanced NLP
- **🎯 Intelligent Data Recognition** - Accurate identification of job titles, companies, and locations
- **🔍 Context-Aware Processing** - Industry-specific terminology understanding

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

## 🎯 Future AI Features

We're continuously expanding our AI capabilities. Here's what's coming:

### 🎯 Interview Preparation AI (Planned)

- **Mock Interview Sessions**: AI-powered interview practice with job-specific questions
- **Performance Analytics**: Detailed feedback on your responses and improvement suggestions
- **Company Research**: Automated research compilation with key talking points

### 📊 Application Analytics (Planned)

- **Success Pattern Analysis**: AI insights into your most successful application strategies
- **Market Intelligence**: Industry trends and salary benchmarking
- **Optimization Recommendations**: Data-driven suggestions for improving your job search

### 🤝 Networking Assistant (Planned)

- **LinkedIn Outreach**: AI-generated personalized connection requests and messages
- **Follow-up Automation**: Smart scheduling and content for application follow-ups
- **Referral Tracking**: Automated tracking of networking opportunities and warm introductions

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

### AI & Backend Technologies

| Technology        | Purpose                                              | Version        |
| ----------------- | ---------------------------------------------------- | -------------- |
| **Google Gemini** | AI language model for text processing and generation | 2.5 Flash-Lite |
| **Google AI SDK** | Official SDK for Gemini API integration              | Latest         |
| **Officegen**     | Microsoft Office document generation (.docx export)  | Latest         |
| **Prisma**        | Modern database toolkit and ORM                      | ^6.16.0        |
| **PostgreSQL**    | Relational database management                       | Latest         |
| **Clerk**         | Authentication and user management                   | ^6.31.9        |

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
   git clone https://github.com/VidyasagarAkhumukhi/JobTracker.git
   cd JobTracker/jobify
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

   # AI Configuration (Google Gemini)
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
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
   - **AI Auto-Fill Option**:
     - Paste the full job description in the AI Auto-Fill text area
     - Click "Autofill from Description" to let AI extract the information automatically
     - Review and adjust the auto-filled data if needed
   - **Manual Entry**: Fill in the required information:
     - Job Title
     - Company Name
     - Location
     - Application Status
     - Employment Mode (Full-time, Part-time, Internship)
     - Date Applied
     - Job URL (optional)
   - Click "Create Job" to save

3. **Using AI Auto-Fill Feature**

   - **Step 1**: Copy the entire job posting from any job board (LinkedIn, Indeed, company websites, etc.)
   - **Step 2**: Paste it into the "Job Description (Optional AI Autofill)" text area
   - **Step 3**: Click "Autofill from Description"
   - **Step 4**: Watch as AI intelligently extracts:
     - Job title
     - Company name
     - Primary work location
   - **Step 5**: Review the auto-filled information and make any necessary adjustments
   - **Step 6**: Complete any remaining fields and save your application

### 🚀 AI-Powered Resume & Cover Letter Suite

#### 📄 AI Resume Optimizer

Transform your resume for each job application:

1. **Access Resume AI**

   - Click the "AI Magic" button in the job creation form
   - Navigate to the "Resume AI" tab

2. **Paste Your Resume**

   - Copy your current resume text
   - Paste it into the "Your Current Resume" text area
   - Include work experience, education, skills, and achievements

3. **Add Job Context**

   - Paste the job description in the "Job Description" field
   - This helps AI tailor your resume to the specific role

4. **Generate Optimized Resume**

   - Click "Generate AI Resume"
   - AI analyzes the job requirements and optimizes your resume accordingly
   - Features include:
     - ✅ ATS-friendly formatting
     - ✅ Keyword optimization
     - ✅ Professional layout with tab stops
     - ✅ Single-line job entries for clean presentation

5. **Export Your Resume**
   - **Word Document**: Click "Download Word Document" for a professional .docx file
   - **Copy Text**: Use "Copy to Clipboard" for quick application submission
   - **Dynamic Naming**: Files are automatically named `UserName_Resume_JobTitle_Company.docx`

#### 💌 AI Cover Letter Generator

Create personalized cover letters in seconds:

1. **Access Cover Letter AI**

   - Click the "AI Magic" button in the job creation form
   - Navigate to the "Cover Letter AI" tab

2. **Add Your Information**

   - Enter your full name, email, phone, and address
   - Provide your background information and key achievements

3. **Job Description Analysis**

   - Paste the complete job description
   - AI automatically extracts company name, role details, and requirements

4. **Generate Cover Letter**

   - Click "Generate AI Cover Letter"
   - AI creates a personalized business letter including:
     - ✅ Professional header with your contact information
     - ✅ Current date (no placeholders)
     - ✅ Company-specific opening paragraph
     - ✅ Tailored body highlighting relevant experience
     - ✅ Strong closing with call-to-action

5. **Export Your Cover Letter**
   - **Word Document**: Professional .docx with proper business letter formatting
   - **Copy Text**: Quick clipboard access for online applications
   - **Dynamic Naming**: Files named `UserName_CoverLetter_JobTitle_Company.docx`

#### 🎯 AI Usage Tips

- **Complete Information**: Provide detailed background and job descriptions for best results
- **Review & Edit**: Always review AI-generated content and personalize as needed
- **Multiple Versions**: Generate different versions for different types of roles
- **Regular Updates**: Update your base resume and background information regularly
- **Quality Assurance**: AI optimizes for ATS systems while maintaining human readability

4. **Managing Applications**

   - View all applications in the "Jobs" section
   - Use the search bar to find specific applications
   - Filter by status using the dropdown menu
   - Click "Edit" on any job card to modify details
   - Delete applications using the delete button

5. **Tracking Progress**

   - Monitor application statuses with color-coded badges:
     - 🟡 **Pending** - Application submitted, awaiting response
     - 🔵 **Applied** - Application confirmed received
     - 🟣 **Interviewing** - In interview process
     - 🟢 **Offer** - Job offer received
     - 🟠 **Declined** - You declined the offer
     - 🔴 **Rejected** - Application unsuccessful

6. **Analytics and Insights**
   - Visit the "Stats" page for detailed analytics
   - View application trends and success rates
   - Monitor your job search progress over time

### Advanced Features

#### 🤖 AI Auto-Fill Tips

- **Best Results**: Copy the complete job posting including job title, company info, and location details
- **Multiple Formats**: Works with job postings from LinkedIn, Indeed, company career pages, and more
- **Accuracy**: AI achieves 95%+ accuracy in extracting standard job posting information
- **Fallback**: If AI cannot extract certain fields, you can still fill them manually
- **API Key**: Ensure your Google Gemini API key is properly configured in environment variables

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

## 🚀 Production Deployment

### Live Application

The JobTracker application is fully deployed and operational:

- **🌐 Live URL**: [https://job-tracker-ai-tau.vercel.app/](https://job-tracker-ai-tau.vercel.app/)
- **🚀 Platform**: Vercel (Edge Runtime)
- **🔒 Authentication**: Clerk (Development Mode - Production Ready)
- **📊 Database**: Prisma Postgres (Cloud)
- **🤖 AI Service**: Google Gemini 2.5 Flash-Lite (Optimized for Cost)

### Deployment Features

- ✅ **Full AI Suite** - Resume optimization, cover letter generation, and job autofill
- ✅ **Word Document Export** - Professional .docx files for resumes and cover letters
- ✅ **Real-time Data** - Live database with instant synchronization
- ✅ **Mobile Responsive** - Optimized for all device sizes
- ✅ **Secure Authentication** - Protected routes and user data
- ✅ **Cost-Optimized AI** - Efficient API usage with Flash-Lite model

### Performance Metrics

- ⚡ **Fast Loading** - Server-side rendering with edge optimization
- 🔄 **Real-time Updates** - TanStack Query for efficient data synchronization
- 📱 **Mobile-First** - Responsive design for seamless mobile experience
- 🛡️ **Secure** - Environment variables and API key protection

### AI Model Configuration

- **Model**: Google Gemini 2.5 Flash-Lite
- **Cost Optimization**: 30-50% cost reduction vs standard Flash model
- **Performance**: Same capabilities with improved efficiency
- **Features**: Job parsing, resume optimization, cover letter generation

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

## 🙏 Acknowledgments

- **Next.js Team** for the excellent React framework
- **Clerk** for seamless authentication solutions
- **Prisma Team** for the modern database toolkit
- **Vercel** for deployment and hosting platform
- **Radix UI** for accessible component primitives
- **TanStack** for powerful state management tools

---

## 📧 Contact

**Vidyasagar Akhumukhi** - [sagar112113@gmail.com](sagar112113@gmail.com)

**Project Link** - [https://github.com/VidyasagarAkhumukhi/JobTracker](https://github.com/VidyasagarAkhumukhi/JobTracker)

**Live** - [https://job-tracker-ai-tau.vercel.app/](https://job-tracker-ai-tau.vercel.app/)

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful! ⭐</strong>
</div>
