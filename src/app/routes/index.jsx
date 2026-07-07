import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute';
import { Skeleton } from '@/components/ui/Badge';

const LandingPage = lazy(() => import('@/pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Auth/SignupPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const TransactionsPage = lazy(() => import('@/pages/Transactions/TransactionsPage'));
const BudgetsPage = lazy(() => import('@/pages/Budgets/BudgetsPage'));
const GoalsPage = lazy(() => import('@/pages/Goals/GoalsPage'));
const AnalyticsPage = lazy(() => import('@/pages/Analytics/AnalyticsPage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="space-y-4 w-64">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

        <Route path="/app/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/app/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
        <Route path="/app/budgets" element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>} />
        <Route path="/app/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
        <Route path="/app/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/app/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
