import AdminDashboard from '@/components/common/AdminDashboard';
import MapView from '@/components/leaflet/Map';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (user?.email === 'admin@university.ac.in') {
    return <AdminDashboard />;
  }

  return (
    <DashboardLayout option='logout'>
      <MapView />
    </DashboardLayout>
  );
};

export default page;
