
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Credenciais fixas para o painel admin
  const ADMIN_EMAIL = "adminexclusive";
  const ADMIN_SENHA = "admin";

  const handleEntrar = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Autenticação fixa de demonstração
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 700);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError("Login ou senha inválidos.");
      }, 700);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-xl bg-white/95">
        <CardHeader className="items-center">
          <img
            src="/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png"
            alt="Exclusive Piscinas Logo"
            className="h-16 w-16 mb-2 rounded-full shadow-md object-contain"
          />
          <CardTitle className="mb-1 text-2xl font-bold text-blue-700">
            Painel Administrativo
          </CardTitle>
          <div className="text-blue-400 text-sm">Acesso exclusivo para administradores</div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEntrar} className="flex flex-col gap-5 mt-2">
            <div>
              <input
                type="text"
                value={email}
                disabled={loading}
                onChange={e => setEmail(e.target.value)}
                className="block w-full border border-blue-300 rounded-md px-4 py-2 bg-blue-50 text-blue-900 placeholder:text-blue-400 focus:border-blue-600 focus:ring focus:ring-blue-200 transition disabled:opacity-75"
                placeholder="Usuário"
                autoFocus
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={senha}
                disabled={loading}
                onChange={e => setSenha(e.target.value)}
                className="block w-full border border-blue-300 rounded-md px-4 py-2 bg-blue-50 text-blue-900 placeholder:text-blue-400 focus:border-blue-600 focus:ring focus:ring-blue-200 transition disabled:opacity-75"
                placeholder="Senha"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-700 hover:bg-blue-800 transition text-white text-base font-semibold rounded-lg"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            {error && (
              <div className="text-red-600 text-center text-sm mt-1">{error}</div>
            )}
            <div className="text-xs text-center text-blue-300 mt-1">
              Usuário: <span className="font-semibold text-blue-700">adminexclusive</span><br/>
              Senha: <span className="font-semibold text-blue-700">admin</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
