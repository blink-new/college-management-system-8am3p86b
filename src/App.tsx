import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { UserManagement } from '@/pages/UserManagement';
import { CourseManagement } from '@/pages/CourseManagement';
import { ScheduleManagement } from '@/pages/ScheduleManagement';
import { AcademicRecords } from '@/pages/AcademicRecords';
import blink from '@/blink/client';
import './App.css';

interface AuthState {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
}

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState(state);
    });
    return unsubscribe;
  }, []);

  // Show loading spinner while auth is initializing
  if (authState.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!authState.isAuthenticated || !authState.user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="mx-auto max-w-sm space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">College Management System</h1>
            <p className="text-muted-foreground">
              Please sign in to access your account
            </p>
          </div>
          <button
            onClick={() => blink.auth.login()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Mock user data - in a real app, this would come from the database
  const mockUser = {
    id: authState.user.id,
    fullName: authState.user.displayName || authState.user.email?.split('@')[0] || 'User',
    email: authState.user.email,
    role: 'admin' as const // Default to admin for demo - this would be fetched from database
  };

  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={mockUser.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header user={mockUser} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route 
                path="/dashboard" 
                element={<Dashboard userRole={mockUser.role} />} 
              />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/schedule" element={<ScheduleManagement />} />
              <Route path="/records" element={<AcademicRecords />} />
              <Route 
                path="/staff" 
                element={
                  <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
                    <p className="text-muted-foreground">Manage staff members and assignments</p>
                  </div>
                } 
              />
              <Route 
                path="/students" 
                element={
                  <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
                    <p className="text-muted-foreground">Manage student information and enrollment</p>
                  </div>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                    <p className="text-muted-foreground">View and manage notifications</p>
                  </div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">System configuration and preferences</p>
                  </div>
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;