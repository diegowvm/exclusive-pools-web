import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import { isAdmin } from "@/utils/supabase-auth";
import { AdminRegister } from "./AdminRegister";

export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Remover a opção de mostrar cadastro inicial:
  // const [showRegister, setShowRegister] = useState(false);

  // NUNCA mostra opção de cadastro inicial depois do primeiro registro

  const handleEntrar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Executa signIn via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (error) {
        setError("Usuário ou senha inválidos.");
        toast({
          title: "Erro no login",
          description: "Verifique usuário e senha.",
        });
        setLoading(false);
        return;
      }
      // Verifica role
      const session = data.session;
      if (!(await isAdmin(session))) {
        setError("Sua conta não tem permissão de administrador.");
        toast({
          title: "Acesso negado",
          description: "Você não é admin.",
        });
        setLoading(false);
        return;
      }
      // Login OK
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao painel admin!",
      });
      setLoading(false);
      onLogin();
    } catch (err) {
      setError("Erro no login.");
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em instantes.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-xl bg-white/95">
        <CardHeader className="flex flex-col items-center">
          <img
            src="/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png"
            alt="Exclusive Piscinas Logo"
            className="h-20 w-20 mb-3 rounded-full shadow-lg bg-white p-2 object-contain border-4 border-blue-300"
            draggable={false}
          />
          <CardTitle className="mb-1 text-2xl font-extrabold text-blue-800 tracking-tight">
            Painel Administrativo
          </CardTitle>
          <div className="text-blue-500 text-sm">
            Acesso exclusivo para administradores
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEntrar} className="flex flex-col gap-6 mt-2">
            <div>
              <Label htmlFor="email" className="text-blue-900 mb-1 block">
                Usuário (E-mail)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={e => setEmail(e.target.value)}
                className="bg-blue-50 border-blue-200 placeholder:text-blue-300 focus:border-blue-600 text-blue-900"
                placeholder="Digite seu e-mail cadastrado"
                autoFocus
                required
              />
            </div>
            <div>
              <Label htmlFor="senha" className="text-blue-900 mb-1 block">
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                disabled={loading}
                onChange={e => setSenha(e.target.value)}
                className="bg-blue-50 border-blue-200 placeholder:text-blue-300 focus:border-blue-600 text-blue-900"
                placeholder="Sua senha"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-800 hover:bg-blue-900 transition text-white text-base font-bold rounded-lg shadow"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            {error && (
              <div className="text-red-600 text-center text-sm mt-1">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
