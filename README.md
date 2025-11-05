# OmniRev - Customer Relationship Management

A modern, full-featured CRM application built with React, TypeScript, and Vite. OmniRev helps businesses manage customer relationships, track analytics, and visualize revenue metrics in real-time.

**Live Application:** https://omnirev.pages.dev

## Features

- **Authentication System** - Secure login with JWT token-based authentication
- **Dashboard Analytics** - Real-time customer insights and revenue metrics
  - Category-based statistics visualization with interactive charts
  - High-value customer identification and tracking
  - Flexible date range filtering (yesterday, 7 days, 30 days, custom)
  - Market-based segmentation
- **Contact Management** - Comprehensive customer database
  - Advanced filtering by status, source, category, market, and date ranges
  - Full-text search across contacts
  - Inline contact editing
  - Pagination with customizable page size
  - Sortable columns
- **Responsive Design** - Fully responsive UI built with Tailwind CSS
- **Modern UI/UX** - Clean interface with loading states, empty states, and error handling

## Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development with strict mode
- **Vite** - Fast build tool and dev server (port 3000)
- **React Router v7** - Client-side routing with lazy loading
- **TanStack Query v5** - Server state management and caching
- **Axios** - HTTP client with request/response interceptors
- **Recharts** - Data visualization (interactive pie charts)
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **date-fns** - Date manipulation and formatting

### Deployment

- **Cloudflare Pages** - Static site hosting with global CDN
- **Cloudflare Workers** - Edge computing for API proxying and CORS handling

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## Project Structure

```
omnirev/
├── src/
│   ├── components/         # Reusable UI components (Button, Input, Modal, etc.)
│   ├── pages/              # Feature-based page modules
│   │   ├── Dashboard/      # Dashboard page with components & hooks
│   │   ├── Contacts/       # Contacts page with components & hooks
│   │   └── Login/          # Login page with hooks
│   ├── layouts/            # Layout components (MainLayout, Sidebar, Header)
│   ├── services/           # API service layer
│   │   ├── api.ts          # Axios instance with interceptors
│   │   ├── auth.service.ts
│   │   ├── contacts.service.ts
│   │   └── dashboard.service.ts
│   ├── hooks/              # Shared custom hooks (useMarkets, useDebounce)
│   ├── helpers/            # Helper functions (chartData, dateFilters)
│   ├── context/            # React Context (AuthContext)
│   ├── providers/          # Provider wrappers (QueryProvider, RouterProvider)
│   ├── types/              # TypeScript type definitions
│   ├── routes/             # Route configuration
│   └── constants/          # App constants
├── functions/api/          # Cloudflare Workers (CORS proxy)
└── .github/workflows/      # CI/CD workflows
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd omnirev

# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Demo Credentials

- **Username**: any username
- **Password**: 11111

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking
- `pnpm deploy` - Build and deploy to Cloudflare Pages

## API Integration

**Backend**: `https://api-mock.omnirev.ai`

The application uses different proxy strategies per environment:

- **Development**: Vite proxy configuration (vite.config.ts) forwards `/api/*` to backend
- **Production**: Cloudflare Workers function (functions/api/[[path]].js) handles CORS and proxies requests

### Key Endpoints

- `POST /auth/login` - User authentication
- `GET /contacts` - List contacts with filters and pagination
- `PUT /contacts/:id` - Update contact
- `GET /categories/stats` - Get category statistics
- `GET /markets` - Get available markets

### Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import {useAuth} from '@/context';
import {Button} from '@/components';
import type {Contact} from '@/types/contact';
```

## Architecture Highlights

### State Management

- **Server State**: TanStack Query for caching, background refetching, and optimistic updates
- **Client State**: React Context for authentication
- **Feature-based Structure**: Pages contain their own components and hooks for better organization

### Code Quality & Build

- Strict TypeScript with comprehensive type safety
- ESLint + Prettier with pre-commit hooks (Husky, lint-staged)
- Code splitting with manual chunks (vendor, router, query-vendor)
- ESBuild minification and asset optimization
- CI/CD with GitHub Actions (lint, type-check, build)

## Browser Support

Modern browsers supporting ES2020:

- Chrome/Edge 80+
- Firefox 72+
- Safari 13.1+

## License

Private - All rights reserved

---

© 2025 OmniRev. All rights reserved.
