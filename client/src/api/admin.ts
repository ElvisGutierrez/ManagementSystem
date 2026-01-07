import { api } from "../api/axios";

export const getAllAppointmentsRequest = () => {
  return api.get("/appointments");
};

export const cancelAppointmentAdminRequest = (id: string) => {
  return api.delete(`/appointments/${id}`);
};
