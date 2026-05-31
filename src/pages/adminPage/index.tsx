import { RegistrationsTable } from '@/components/RegistrationsTable'
import { AdminLayout } from '@/components/layout/AdminLayout'

export const AdminPage = () => {
  return (
    <AdminLayout title="Registrations" notificationCount={3}>
      <RegistrationsTable />
    </AdminLayout>
  )
}
