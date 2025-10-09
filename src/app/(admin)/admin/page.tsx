import AdminDashboard from "@/components/pages/admin";

export const metadata = {
  title: "Admin Dashboard - Matte Digital",
  description: "Admin dashboard for managing clients, projects, invoices, and documents"
};

export default function AdminPage() {
  return <AdminDashboard />;
}