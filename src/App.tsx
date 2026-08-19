import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Modules
import { DashboardModule } from './components/modules/DashboardModule';
import { StudentModule } from './components/modules/StudentModule';
import { StaffModule } from './components/modules/StaffModule';
import { ClassesModule } from './components/modules/ClassesModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { ExamsModule } from './components/modules/ExamsModule';
import { TimetableModule } from './components/modules/TimetableModule';
import { FeesModule } from './components/modules/FeesModule';
import { AssignmentsModule } from './components/modules/AssignmentsModule';
import { CommunicationModule } from './components/modules/CommunicationModule';
import { LibraryModule } from './components/modules/LibraryModule';
import { TransportModule } from './components/modules/TransportModule';
import { EventsModule } from './components/modules/EventsModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { SettingsModule } from './components/modules/SettingsModule';

const MainContent: React.FC = () => {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardModule onNavigate={setCurrentModule} />;
      case 'students':
        return <StudentModule />;
      case 'staff':
        return <StaffModule />;
      case 'classes':
        return <ClassesModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'exams':
        return <ExamsModule />;
      case 'timetable':
        return <TimetableModule />;
      case 'fees':
        return <FeesModule />;
      case 'assignments':
        return <AssignmentsModule />;
      case 'communication':
        return <CommunicationModule />;
      case 'library':
        return <LibraryModule />;
      case 'transport':
        return <TransportModule />;
      case 'events':
        return <EventsModule />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <DashboardModule onNavigate={setCurrentModule} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar currentModule={currentModule} onSelectModule={setCurrentModule} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {renderModule()}
        </main>
      </div>

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={setCurrentModule}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
