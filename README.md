

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with React 18, TypeScript, Vite, and Tailwind CSS
- **API Integration**: Fetches user roles from external API with proper error handling and loading states
- **Comprehensive Testing**: Unit tests for components, hooks, and API services


## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **Deployment**: Vercel


## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/giffyonyinye/trygrupp-task.git
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



