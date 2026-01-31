# Task App

A modern task management application built with Next.js, featuring task CRUD operations, status management, comments, and real-time data synchronization with localStorage.

🌐 **Live Demo**: [https://tasks-app-audrey.vercel.app/](https://tasks-app-audrey.vercel.app/)

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19.2.3
- **State Management**: Redux Toolkit 2.2.7
- **Data Fetching**: React Query (TanStack Query) 4.43.0
- **Form Handling**: React Hook Form 7.71.1 with Zod 4.3.6 validation
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (Dialog, Dropdown Menu)
- **Icons**: Lucide React
- **HTTP Client**: Axios 1.13.4
- **Testing**: Jest 30.2.0 with React Testing Library
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **pnpm**: Version 8 or higher ([Installation Guide](https://pnpm.io/installation))

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-app
```

### 2. Install Dependencies

```bash
pnpm install
```

> **Note**: This project uses `pnpm` as the package manager. If you don't have pnpm installed, you can install it globally with:
> ```bash
> npm install -g pnpm
> ```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add the following environment variable:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

> **Note**: The default API URL points to JSONPlaceholder, a fake REST API for testing. You can change this to your own API endpoint if needed.

### 4. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🏃 Running the Project Locally

### Development Mode

```bash
pnpm dev
```

This starts the Next.js development server with hot-reload enabled. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Linting

```bash
pnpm lint
```

### Testing

This project uses **Jest** for unit testing with React Testing Library for component testing.

#### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (auto-rerun on file changes)
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

#### Test Structure

Tests are organized in `__tests__` folders alongside the code they test:

```
src/
├── helper/
│   ├── __tests__/
│   │   └── helper.test.ts          # Helper functions tests
│   └── helper.ts
├── lib/
│   ├── __tests__/
│   │   └── utils.test.ts           # Utility functions tests
│   └── utils.ts
├── schema/
│   ├── __tests__/
│   │   ├── tasks.model.test.ts     # Task schema validation tests
│   │   └── tasks.form.test.ts      # Form validation tests
│   ├── tasks.model.ts
│   └── tasks.form.ts
└── store/
    └── slices/
        ├── __tests__/
        │   └── tasksSlice.test.ts  # Redux slice tests
        └── tasksSlice.ts
```

#### Test Coverage

The project includes unit tests for:

- ✅ **Helper Functions**: Status color and label utilities
- ✅ **Utility Functions**: Class name merging (cn function)
- ✅ **Schema Validation**: Zod schema validation for tasks and forms
- ✅ **Redux Slices**: State management actions and reducers

#### Test Configuration

- **Jest Config**: `jest.config.js` - Configured for Next.js with TypeScript support
- **Test Setup**: `jest.setup.js` - Includes mocks for Next.js router, localStorage, and matchMedia
- **Type Definitions**: `src/types/jest.d.ts` - Jest type definitions

#### Writing Tests

When writing new tests:

1. Create a `__tests__` folder next to the file you're testing
2. Name the test file as `[filename].test.ts` or `[filename].test.tsx`
3. Use Jest and React Testing Library for component tests
4. Follow the existing test patterns in the codebase

Example test structure:

```typescript
import { functionToTest } from '../file'

describe('FunctionName', () => {
  it('should do something', () => {
    const result = functionToTest()
    expect(result).toBe(expectedValue)
  })
})
```

## 🚀 Deployment

This project is deployed on **Vercel**, a platform optimized for Next.js applications.

### Live Application

🌐 **Production URL**: [https://tasks-app-audrey.vercel.app/](https://tasks-app-audrey.vercel.app/)

The application is automatically deployed from the main branch and updates on every push.

### Deployment Platform: Vercel

**Vercel** provides:
- ✅ Automatic deployments from Git
- ✅ Preview deployments for pull requests
- ✅ Edge Network for global performance
- ✅ Zero-configuration for Next.js
- ✅ Environment variable management
- ✅ Analytics and monitoring

### Deployment Configuration

The project uses Vercel's default Next.js configuration:

- **Build Command**: Automatically detected (`next build`)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Framework Preset**: Next.js

### Environment Variables

Make sure to configure the following environment variables in Vercel:

1. Go to your project settings in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   ```
   NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
   ```

### Deploying to Vercel

#### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables
4. Click **Deploy**

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Deployment Workflow

1. **Push to Main Branch**: Automatically triggers a production deployment
2. **Pull Requests**: Creates preview deployments for each PR
3. **Build Process**: Runs `pnpm install` and `next build`
4. **Deployment**: Deploys to Vercel's Edge Network

### Custom Domain (Optional)

To add a custom domain:

1. Go to **Settings** → **Domains** in Vercel Dashboard
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

### Monitoring and Analytics

Vercel provides built-in analytics:
- **Web Analytics**: Track page views and performance
- **Speed Insights**: Monitor Core Web Vitals
- **Real User Monitoring**: Understand user experience

Access analytics in the Vercel Dashboard under your project's **Analytics** tab.

## 📁 Project Structure

```
task-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── providers.tsx       # React Query & Redux providers
│   │   └── ui/                 # UI components (Button, Input, Table, etc.)
│   ├── features/               # Feature-based modules
│   │   └── tasks/              # Task management feature
│   │       ├── TasksScreen.tsx      # Main tasks screen
│   │       ├── TasksTable.tsx      # Tasks table component
│   │       ├── AddTaskModal.tsx    # Add task modal
│   │       └── ViewTaskModal.tsx   # View task details modal
│   ├── hooks/                  # Custom React hooks
│   │   ├── tasks.hook.ts       # Tasks data fetching hook
│   │   └── comments.hook.ts    # Comments data fetching hook
│   ├── lib/                    # Utility functions
│   │   └── utils.ts           # Common utilities (cn function)
│   ├── schema/                 # Zod schemas
│   │   ├── tasks.model.ts      # Task data models
│   │   ├── tasks.form.ts       # Task form validation
│   │   └── comments.model.ts   # Comment data models
│   ├── services/               # API services
│   │   ├── fetcher.ts         # Axios instance & fetcher utility
│   │   ├── tasks.service.ts   # Tasks API service
│   │   └── comments.service.ts # Comments API service
│   ├── store/                  # Redux store
│   │   ├── store.ts           # Redux store configuration
│   │   ├── StoreProvider.tsx  # Redux provider component
│   │   ├── hooks.ts           # Typed Redux hooks
│   │   └── slices/            # Redux slices
│   │       └── tasksSlice.ts  # Tasks state management
│   ├── ui/                     # Custom UI components
│   │   ├── Table.tsx          # Enhanced table with pagination & search
│   │   ├── Modal.tsx          # Modal wrapper component
│   │   └── Dropdown.tsx       # Dropdown menu component
│   └── helper/                 # Helper functions
│       └── helper.ts          # Utility helpers
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup file
└── package.json              # Project dependencies
```

## ✨ Features

### Task Management
- ✅ **Create Tasks**: Add new tasks with title and description
- ✅ **View Tasks**: View task details in a modal with comments
- ✅ **Update Status**: Change task status (Pending/Completed)
- ✅ **Delete Tasks**: Remove tasks with confirmation
- ✅ **Search**: Search tasks by title, description, or ID
- ✅ **Filter**: Filter tasks by status (All/Pending/Completed)
- ✅ **Pagination**: Navigate through tasks with customizable rows per page (5, 10, 50, 100)

### Data Persistence
- 💾 **LocalStorage**: All tasks are automatically saved to browser localStorage
- 🔄 **Redux State**: Global state management with Redux Toolkit
- 🌐 **API Integration**: Fetches initial data from JSONPlaceholder API

### Comments
- 💬 **View Comments**: Display comments for each task
- 📝 **Real-time Loading**: Comments are fetched when viewing task details

### UI/UX
- 🎨 **Modern Design**: Clean and responsive UI with Tailwind CSS
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Optimized with React Query for efficient data fetching
- 🎯 **Type-safe**: Full TypeScript support with Zod validation

## 📝 Additional Notes

### State Management

The application uses **Redux Toolkit** for global state management:

- **Tasks State**: Stored in Redux store and synchronized with localStorage
- **Auto-sync**: Changes to tasks are automatically saved to localStorage
- **Merge Strategy**: API data is merged with localStorage data to avoid duplicates

### Data Flow

1. **Initial Load**: Tasks are fetched from API and merged with localStorage data
2. **User Actions**: Create, update, or delete operations update Redux store
3. **Persistence**: Redux store automatically syncs with localStorage
4. **Comments**: Fetched on-demand when viewing task details

### Form Validation

Forms use **React Hook Form** with **Zod** for validation:

- Client-side validation with Zod schemas
- Real-time error messages
- Type-safe form handling

### API Configuration

The application uses JSONPlaceholder as the default API:

- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
- **Endpoints**:
  - `GET /posts` - Fetch tasks
  - `GET /posts/:id/comments` - Fetch comments for a task

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- ES2017+ JavaScript features

### Performance Considerations

- **React Query**: Caches API responses to reduce network requests
- **Code Splitting**: Next.js automatically splits code for optimal loading
- **Image Optimization**: Next.js Image component for optimized images

### Troubleshooting

#### Common Issues

1. **Hydration Mismatch Error**
   - Ensure all components are properly marked with `"use client"` directive
   - Check for any browser-only APIs used during SSR

2. **LocalStorage Not Working**
   - Ensure you're running in a browser environment (not SSR)
   - Check browser console for localStorage errors

3. **API Errors**
   - Verify `NEXT_PUBLIC_API_URL` is set correctly in `.env.local`
   - Check network tab for API request failures

4. **Build Errors**
   - Run `pnpm install` to ensure all dependencies are installed
   - Clear `.next` folder and rebuild: `rm -rf .next && pnpm build`

### Development Tips

- Use React DevTools and Redux DevTools for debugging
- Check browser console for warnings and errors
- Use TypeScript strict mode for better type safety
- Follow the feature-based folder structure for new features

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write or update tests for new functionality
4. Ensure all tests pass (`pnpm test`) and linting is clean (`pnpm lint`)
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Happy Coding! 🎉**
