// app/admin/layout.tsx
import DashboardLayout from '@/components/admin/AdminLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}