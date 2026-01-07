import { Request, Response } from "express";
import Appointment from "../../infrastructure/models/AppointmentModel";

export const createAppointment = async (req: Request, res: Response) => {
  const { date, startTime, endTime } = req.body;

  const conflict = await Appointment.findOne({
    date,
    startTime,
  });

  if (conflict) {
    return res.status(400).json({ message: "Horario no disponible" });
  }

  const appointment = await Appointment.create({
    user: req.user!.id,
    date,
    startTime,
    endTime,
  });

  res.status(201).json(appointment);
};

export const getMyAppointments = async (req: Request, res: Response) => {
  const appointments = await Appointment.find({
    user: req.user!.id,
  }).sort({ date: 1 });

  res.json(appointments);
};

export const getAllAppointments = async (_req: Request, res: Response) => {
  const appointments = await Appointment.find().populate("user", "name email");
  res.json(appointments);
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }

  if (appointment.user.toString() !== req.user!.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await appointment.deleteOne();

  res.json({ message: "Cita cancelada correctamente" });
};

export const adminCancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }

  appointment.status = "CANCELLED";
  await appointment.save();

  res.json({
    message: "Cita cancelada por el administrador",
  });
};
