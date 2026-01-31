# Task App

A modern task management application built with Next.js, featuring task CRUD operations, status management, comments, and real-time data synchronization with localStorage.

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
3. Ensure all tests pass and linting is clean
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Happy Coding! 🎉**
