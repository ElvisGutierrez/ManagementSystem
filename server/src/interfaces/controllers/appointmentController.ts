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
