import { AdminDashboard } from '@/Pages/AdminDashboard';

/**
 * The existing `/dashboard` route now hosts the platform-wide admin view.
 * Personal data remains available on `/UserProfile`.
 */
export function Dashboard() {
  return <AdminDashboard />;
}
