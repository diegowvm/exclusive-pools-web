
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { isAdmin } from "@/utils/supabase-auth";

// Esqueleto simples; adicione validações e use Supabase Auth futuramente
export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEntrar(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Exemplo: use Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setError("Falha de login: " + error.message);
      setLoading(false);
      return;
    }
    // Checa se é administrador
    const session = data.session;
    const admin = await isAdmin(session);
    if (!admin) {
      setError("Acesso restrito: você não tem permissão de administrador.");
      setLoading(false);
      return;
    }

    onLogin();
    setLoading(false);
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="mb-2 text-aqua-primary">Acesso Restrito</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEntrar} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            disabled={loading}
            onChange={e => setEmail(e.target.value)}
            className="border border-slate-300 px-3 py-2 rounded"
            placeholder="E-mail do administrador"
            required
          />
          <input
            type="password"
            value={senha}
            disabled={loading}
            onChange={e => setSenha(e.target.value)}
            className="border border-slate-300 px-3 py-2 rounded"
            placeholder="Senha"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
