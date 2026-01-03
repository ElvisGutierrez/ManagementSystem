import { useEffect, useState } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="min-h-screen bg-[#111827] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">
        👋 Bienvenido{user?.name ? `, ${user.name}` : ""}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <DashboardCard
          title="Reservar cita"
          description="Agenda una nueva cita seleccionando fecha y hora disponibles."
          to="/appointments/new"
        />

        <DashboardCard
          title="Mis citas"
          description="Revisa todas las citas que has reservado."
          to="/my-appointments"
        />
      </div>
    </div>
  );
};

export default Dashboard;
