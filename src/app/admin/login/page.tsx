import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin - Iniciar sesión",
  robots: "noindex",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl font-bold text-[#F0F1F5]">
              Defi<span className="text-[#00FF88]">Venezuela</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#F0F1F5]">Panel de Administración</h1>
          <p className="text-[#9DA5B4]/60 text-sm mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#00FF88]/20 bg-[#161B24] p-8">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#9DA5B4]/40 mt-8">
          Solo acceso de administrador. La sesión expira en 8 horas.
        </p>
      </div>
    </div>
  );
}
