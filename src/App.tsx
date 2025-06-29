import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SettingsPage } from '@/components/settings/SettingsPage';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useResponsive } from '@/hooks/useResponsive';
import { useUserRoles } from '@/hooks/useUserRoles';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  const { roles, isLoading, error, retry } = useUserRoles();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen" style={{background: '#F9FAFB'}}>
        <Sidebar
          isOpen={isMobile ? isSidebarOpen : true}
          onClose={isMobile ? closeSidebar : undefined}
        />

        <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto lg:ml-0">
          <Header onMenuClick={toggleSidebar} isLoading={isLoading} />
          <SettingsPage
            roles={roles}
            isLoading={isLoading}
            error={error}
            retry={retry}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
