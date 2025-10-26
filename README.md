# OmniRev - Customer Relationship Management

A modern, full-featured CRM application built with React, TypeScript, and Vite. OmniRev helps businesses manage customer relationships, track analytics, and visualize revenue metrics in real-time.

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
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **TanStack Query (React Query)** - Server state management and caching
- **Axios** - HTTP client with interceptors
- **Recharts** - Data visualization
- **Tailwind CSS v4** - Utility-first CSS framework
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
│   ├── components/       # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Select/
│   │   ├── Pagination/
│   │   ├── Dashboard/    # Dashboard-specific components
│   │   ├── Contacts/     # Contact management components
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── Contacts.tsx
│   ├── services/         # API service layer
│   │   ├── api.ts        # Axios instance with interceptors
│   │   ├── auth.service.ts
│   │   ├── contacts.service.ts
│   │   └── dashboard.service.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useLogin.ts
│   │   ├── useContacts.ts
│   │   ├── useDashboardFilters.ts
│   │   └── ...
│   ├── context/          # React context providers
│   │   └── AuthContext.tsx
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── routes/           # Route configuration
│   └── constants/        # App constants
├── functions/            # Cloudflare Workers functions
│   └── api/
│       └── [[path]].js   # CORS proxy worker
└── dist/                 # Production build output
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd omnirev
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory (if needed for custom configuration)

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

The application uses a proxy configuration to handle API requests:

- **Development**: Vite proxy forwards `/api/*` requests to the backend API
- **Production**: Cloudflare Workers function handles CORS and proxies requests

Backend API base URL: `https://api-mock.omnirev.ai`

### API Endpoints

- `POST /auth/login` - User authentication
- `GET /contacts` - List contacts with filters and pagination
- `GET /contacts/:id` - Get single contact
- `PUT /contacts/:id` - Update contact
- `GET /categories/stats` - Get category statistics
- `GET /markets` - Get available markets
- `GET /categories` - Get available categories

## Key Features Explained

### Authentication Flow

- JWT token-based authentication
- Tokens stored in localStorage
- Automatic token injection via Axios interceptors
- Auto-redirect to login on 401 responses
- Protected routes with route guards

### Dashboard Analytics

- Real-time category-based company statistics
- Interactive pie chart visualization
- High-value customer table with sorting
- Date range presets and custom date selection
- Market-based filtering

### Contact Management

- Advanced multi-criteria filtering
- Debounced search for better performance
- Status tracking (potential, customer, lapsed)
- Source tracking (CRM, Organic)
- Category classification (education, art, legal, financial)
- Order count and total order amount tracking

### State Management

- TanStack Query for server state with automatic caching and refetching
- React Context for auth state
- Custom hooks for business logic encapsulation
- Optimistic updates for better UX

## Code Quality

The project includes:

- TypeScript for type safety
- ESLint for code linting
- Prettier for consistent formatting
- Husky for pre-commit hooks
- lint-staged for efficient linting

## Build Optimization

- Code splitting with manual chunks (vendor, router)
- Tree shaking for minimal bundle size
- ESBuild for fast minification
- Sourcemap disabled in production
- Asset optimization and hashing

## Browser Support

Modern browsers supporting ES2020:

- Chrome/Edge 80+
- Firefox 72+
- Safari 13.1+

## License

Private - All rights reserved

---

© 2025 OmniRev. All rights reserved.
