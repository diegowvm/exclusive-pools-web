
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

interface AdminRegisterProps {
  onRegistered: () => void;
  onCancel: () => void;
}

export function AdminRegister({ onRegistered, onCancel }: AdminRegisterProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Cadastra usuário no Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { role: "admin" }, // user_metadata com role admin
        },
      });
      if (signUpError) {
        setError(signUpError.message || "Erro ao cadastrar.");
        toast({
          title: "Erro no cadastro",
          description: signUpError.message || "Não foi possível cadastrar.",
        });
        setLoading(false);
        return;
      }

      // Extra: Força role no app_metadata (caso precise políticas mais rígidas)
      await supabase.auth.updateUser({
        data: {},
        // Força role=admin no app_metadata também, se suportado
        // app_metadata: { role: "admin" },
      });

      toast({
        title: "Cadastro realizado!",
        description:
          "Sua conta foi criada como ADMIN. Confirme o e-mail caso necessário.",
      });
      setLoading(false);
      onRegistered();
    } catch (err) {
      setError("Erro inesperado no cadastro.");
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
            Cadastro do Primeiro Administrador
          </CardTitle>
          <div className="text-blue-500 text-sm text-center">
            Preencha para registrar o PRIMEIRO acesso de administrador
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCadastro} className="flex flex-col gap-6 mt-2">
            <div>
              <Label htmlFor="email" className="text-blue-900 mb-1 block">
                E-mail (Usuário)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={e => setEmail(e.target.value)}
                className="bg-blue-50 border-blue-200 placeholder:text-blue-300 focus:border-blue-600 text-blue-900"
                placeholder="Digite seu e-mail de administrador"
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
                placeholder="Crie uma senha forte"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-800 hover:bg-blue-900 transition text-white text-base font-bold rounded-lg shadow"
            >
              {loading ? "Registrando..." : "Cadastrar Administrador"}
            </Button>
            {error && (
              <div className="text-red-600 text-center text-sm mt-1">
                {error}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="w-full mt-2"
            >
              Já tenho acesso
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

