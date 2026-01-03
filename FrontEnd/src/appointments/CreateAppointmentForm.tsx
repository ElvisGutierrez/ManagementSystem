import { useState } from "react";
import { createAppointmentRequest } from "../api/appointments";
import { AxiosError } from "axios";

const CreateAppointmentForm = () => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccess(false);

      await createAppointmentRequest(form);

      setSuccess(true);
      setForm({ date: "", startTime: "", endTime: "" });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message || "Error al crear la cita"
        );
      } else {
        setErrorMessage("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b2738] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#3b364c] rounded-xl p-8 shadow-lg space-y-6"
      >
        <h2 className="text-white text-2xl font-semibold text-center">
          📅 Reservar Cita
        </h2>

        {/* ALERTA ERROR */}
        {errorMessage && (
          <div className="bg-red-500 text-white text-sm px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        {/* ALERTA SUCCESS */}
        {success && (
          <div className="bg-green-500 text-white text-sm px-4 py-2 rounded">
            ✅ Cita creada con éxito
          </div>
        )}

        {/* FECHA */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full h-[45px] px-3 rounded bg-[#2b2738] border border-[#2b2738]
            text-white outline-none focus:border-[#6e54b5]"
          />
        </div>

        {/* HORA INICIO */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Hora inicio
          </label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
            className="w-full h-[45px] px-3 rounded bg-[#2b2738] border border-[#2b2738]
            text-white outline-none focus:border-[#6e54b5]"
          />
        </div>

        {/* HORA FIN */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Hora fin</label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
            className="w-full h-[45px] px-3 rounded bg-[#2b2738] border border-[#2b2738]
            text-white outline-none focus:border-[#6e54b5]"
          />
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[45px] flex items-center justify-center gap-2
          bg-[#6e54b5] border border-[#6e54b5] rounded text-white
          hover:bg-[#56418e] hover:border-[#56418e]
          transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Guardando...
            </>
          ) : (
            "Reservar"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentForm;
