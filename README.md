

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with React 18, TypeScript, Vite, and Tailwind CSS
- **API Integration**: Fetches user roles from external API with proper error handling and loading states
- **Interactive Components**: Dropdown menus, hover states, and smooth transitions
- **Comprehensive Testing**: Unit tests for components, hooks, and API services
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
- **Professional Code Quality**: Clean, maintainable code following React best practices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Design Implementation

The application faithfully implements the Figma design with:

- **Desktop Layout**: Sidebar navigation with main content area and data table
- **Mobile Layout**: Collapsible navigation and card-based layout for better mobile UX
- **Color System**: Custom color palette matching the design specifications
- **Typography**: Inter font family with proper font weights and sizes
- **Interactive States**: Hover effects, focus states, and loading indicators

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd settings-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📊 API Integration

The application integrates with the provided API endpoint:
- **Endpoint**: `https://gamma-api.vercel.app/api/roles`
- **Features**: Error handling, loading states, retry functionality
- **Type Safety**: Full TypeScript interfaces for API responses

## 🧪 Testing

Comprehensive test suite covering:
- **Component Testing**: UI components with various props and states
- **Hook Testing**: Custom hooks for data fetching and responsive behavior
- **API Testing**: Service layer with mocked responses
- **Integration Testing**: User interactions and workflows

Run tests with:
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── settings/       # Settings-specific components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── test/               # Test setup and utilities
```

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS:

- **Colors**: Primary, gray, success, warning, and error color palettes
- **Typography**: Inter font with consistent sizing and weights
- **Spacing**: Consistent spacing scale for margins and padding
- **Components**: Reusable Button, Badge, Avatar, and other UI components

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px (md to lg)
- **Desktop**: > 1024px (lg+)
- **Large Desktop**: > 1280px (xl+)

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live Demo**: [Deployment URL will be provided]

## 🔍 Key Features Implemented

### Desktop View
- Sidebar navigation with search functionality
- Settings tabs navigation
- User roles management section
- Data table with sorting and actions
- Dropdown menus for role actions

### Mobile View
- Collapsible sidebar navigation
- Simplified tab navigation
- Card-based layout for better mobile UX
- Touch-friendly interactions

### Interactive Features
- Hover states and transitions
- Loading states and error handling
- Dropdown menus with keyboard navigation
- Responsive avatar groups
- Status badges and type indicators

## 📄 License

This project is built as a technical assessment and follows modern web development best practices.


