import { Link } from "react-router-dom";
import RegisterForm from "../auth/RegisterForm";
import FullScreenLoader from "../components/FullScreenLoader";
import { useEffect, useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* IMAGEN (solo desktop) */}
      <div className="hidden md:flex bg-[#2b2738] p-2">
        <img
          src="/image1.png"
          alt="Register"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* FORMULARIO */}
      <div className="flex flex-col items-center justify-center gap-8 px-8 bg-[#2b2738]">
        <div className="max-w-[450px] w-full space-y-8">
          <h1 className="text-4xl font-semibold text-white">Crear cuenta</h1>
          <p className="text-sm text-white">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#6e54b5] hover:underline cursor-pointer"
            >
              Inicia sesión
            </Link>
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
