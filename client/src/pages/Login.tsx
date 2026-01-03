import { Link } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import FullScreenLoader from "../components/FullScreenLoader";
import { useEffect, useState } from "react";

const Login = () => {
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
          alt="Login"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* FORMULARIO */}
      <div className="flex flex-col items-center justify-center gap-4 px-4 bg-[#2b2738]">
        <div className="max-w-[450px] w-full space-y-8">
          <h1 className="text-4xl font-semibold text-white">Iniciar sesión</h1>
          <p className="text-sm text-white">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[#6e54b5] hover:underline">
              Regístrate aquí
            </Link>
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
