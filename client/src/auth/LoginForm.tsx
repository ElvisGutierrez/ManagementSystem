import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequest } from "../api/auth";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

/* Schema */
const loginSchema = z.object({
  email: z.string().nonempty("El email es obligatorio").email("Email inválido"),
  password: z.string().nonempty("La contraseña es obligatoria"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  /* const [success, setSuccess] = useState(false); */
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage("");
      setLoading(true);

      const res = await loginRequest(data);

      login({
        token: res.data.token,
        user: res.data.user,
      });

      localStorage.setItem("token", res.data.token);

      await sleep(1500);
      /* setSuccess(true); */

      /* setLoading(false); */
      await sleep(1500);

      navigate("/dashboard");
    } catch {
      setLoading(false);
      setErrorMessage("Email o contraseña incorrectos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full items-center bg-[#2b2738]"
    >
      {/* ALERTA */}
      {/* {success && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Datos correctos
        </div>
      )} */}

      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}

      {/* EMAIL */}
      <div className="w-full max-w-[450px]">
        <input
          {...register("email")}
          placeholder="Email"
          autoComplete="email"
          className="w-full h-[45px] px-2 border text-white outline-none
          border-[#3b364c] bg-[#3b364c] rounded"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="relative w-full max-w-[450px]">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full h-[45px] px-2 pr-10 border text-white outline-none
          border-[#3b364c] bg-[#3b364c] rounded"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2
          text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {errors.password && (
        <p className="text-red-400 text-sm -mt-2 max-w-[450px] w-full">
          {errors.password.message}
        </p>
      )}

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer max-w-[450px] h-[45px]
        flex items-center justify-center
        text-white border bg-[#6e54b5] border-[#6e54b5] rounded
        hover:bg-[#56418e] hover:border-[#56418e]
        transition-colors disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Cargando...
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
