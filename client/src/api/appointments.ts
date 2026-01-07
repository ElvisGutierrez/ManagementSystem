import { api } from "./axios";

export const createAppointmentRequest = (data: {
  date: string;
  startTime: string;
  endTime: string;
}) => {
  return api.post("/appointments", data);
};

export const getMyAppointmentsRequest = () => {
  return api.get("/appointments/my");
};

export const cancelAppointmentRequest = (id: string) => {
  return api.delete(`/appointments/${id}`);
};
