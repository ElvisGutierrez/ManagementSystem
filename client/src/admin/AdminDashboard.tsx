import { useEffect, useState } from "react";
import {
  getAllAppointmentsRequest,
  cancelAppointmentAdminRequest,
} from "../api/admin";

interface Appointment {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointmentsRequest();
      setAppointments(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("¿Cancelar esta cita?")) return;

    try {
      setCancelingId(id);
      await cancelAppointmentAdminRequest(id);
      await fetchAppointments();
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">
          🛠️ Panel de Administración
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full" />
          </div>
        )}

        {/* TABLA */}
        {!loading && (
          <div className="overflow-x-auto bg-[#1f2937] rounded-lg shadow">
            <table className="w-full text-sm">
              <thead className="bg-[#374151] text-gray-200">
                <tr>
                  <th className="p-4 text-left">Usuario</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Hora</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a._id}
                    className="border-t border-gray-700 hover:bg-[#374151]"
                  >
                    <td className="p-4">{a.user?.name}</td>
                    <td className="p-4 text-gray-300">{a.user?.email}</td>
                    <td className="p-4 text-center">{a.date}</td>
                    <td className="p-4 text-center">
                      {a.startTime} - {a.endTime}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleCancel(a._id)}
                        disabled={cancelingId === a._id}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded
                        text-xs transition disabled:opacity-50"
                      >
                        {cancelingId === a._id ? "Cancelando..." : "Cancelar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {appointments.length === 0 && (
              <div className="text-center text-gray-300 py-10">
                No hay citas registradas
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
