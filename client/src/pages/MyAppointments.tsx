import { useEffect, useState } from "react";
import { getMyAppointmentsRequest } from "../api/appointments";

interface Appointment {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointmentsRequest();
        setAppointments(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-[#2b2738] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8 flex items-center gap-2">
          📋 Mis Citas
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="animate-spin h-8 w-8 border-4 border-[#6e54b5] border-t-transparent rounded-full" />
          </div>
        )}

        {/* SIN CITAS */}
        {!loading && appointments.length === 0 && (
          <div className="bg-[#3b364c] text-gray-300 text-center py-10 rounded-lg shadow">
            No tienes citas registradas 📭
          </div>
        )}

        {/* LISTA DE CITAS */}
        {!loading && appointments.length > 0 && (
          <ul className="grid gap-4">
            {appointments.map((a) => (
              <li
                key={a._id}
                className="bg-[#3b364c] rounded-lg p-5 shadow
                flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="text-white space-y-1">
                  <p className="text-lg font-medium">📅 {a.date}</p>
                  <p className="text-gray-300 text-sm">
                    ⏰ {a.startTime} - {a.endTime}
                  </p>
                </div>

                <span
                  className="mt-3 sm:mt-0 inline-block px-4 py-1 text-sm
                  rounded-full bg-[#6e54b5] text-white"
                >
                  Reservada
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
