import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import CreateAppointment from "../pages/CreateAppointment";
import MyAppointments from "../pages/MyAppointments";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protegido */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments/new"
          element={
            <PrivateRoute>
              <CreateAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <PrivateRoute>
              <MyAppointments />
            </PrivateRoute>
          }
        />
        ;
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
