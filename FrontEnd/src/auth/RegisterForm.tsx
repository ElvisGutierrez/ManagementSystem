import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/* 1️⃣ Schema */
const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("El nombre es obligatorio")
      .min(3, "Mínimo 3 caracteres")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "El nombre solo puede contener letras"
      ),

    email: z
      .string()
      .nonempty("El email es obligatorio")
      .email("Email inválido")
      .transform((val) => val.toLowerCase()),

    password: z
      .string()
      .nonempty("La contraseña es obligatoria")
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener una mayúscula")
      .regex(/[a-z]/, "Debe contener una minúscula")
      .regex(/[0-9]/, "Debe contener un número")
      .regex(/^\S*$/, "No debe contener espacios"),

    confirmPassword: z.string().nonempty("Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      setLoading(true);

      await registerRequest(payload);

      await sleep(2500);

      setLoading(false);

      setSuccess(true);

      await sleep(2000);

      navigate("/login");
    } catch {
      setLoading(false);
      alert("Error al registrar usuario");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full items-center bg-[#2b2738]"
    >
      {success && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Registro exitoso
        </div>
      )}

      {/* NOMBRE */}
      <div className="w-full max-w-[450px]">
        <input
          {...register("name")}
          placeholder="Nombre"
          autoComplete="name"
          className="w-full h-[45px] px-2 border text-white outline-none
            border-[#3b364c] bg-[#3b364c] rounded"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

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
          autoComplete="new-password"
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

      {/* CONFIRM PASSWORD */}
      <div className="relative w-full max-w-[450px]">
        <input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmar Password"
          autoComplete="new-password"
          className="w-full h-[45px] px-2 pr-10 border text-white outline-none
      border-[#3b364c] bg-[#3b364c] rounded"
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2
      text-gray-400 hover:text-white"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {errors.confirmPassword && (
        <p className="text-red-400 text-sm -mt-2 max-w-[450px] w-full">
          {errors.confirmPassword.message}
        </p>
      )}

      {/* SUBMIT */}
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
            Registrando...
          </span>
        ) : (
          "Registrarse"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
