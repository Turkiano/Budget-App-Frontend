import api from './api';
import type { AdminDashboard } from '@/Types/api';

/**
 * Single read-only aggregate for the admin dashboard. `/groups` is scoped to
 * the logged-in user, so platform-wide group/category/transaction math is
 * assembled by the API instead of the browser.
 */
export async function getAdminDashboard(): Promise<AdminDashboard> {
  const { data } = await api.get<AdminDashboard>('/admin/dashboard');
  return data;
}
