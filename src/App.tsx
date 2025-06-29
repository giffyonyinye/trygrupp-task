import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SettingsPage } from '@/components/settings/SettingsPage';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useResponsive } from '@/hooks/useResponsive';

/**
 * Main App component with responsive layout
 */
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen" style={{background: '#F9FAFB'}}>
        {/* Sidebar */}
        <Sidebar
          isOpen={isMobile ? isSidebarOpen : true}
          onClose={isMobile ? closeSidebar : undefined}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto lg:ml-0">
          {/* Header */}
          <Header onMenuClick={toggleSidebar} />

          {/* Settings Page */}
          <SettingsPage />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
