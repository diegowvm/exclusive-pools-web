
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

interface AdminInitialRegisterProps {
  onRegistered: (userData: { nome: string; email: string }) => void;
  onRestart: () => void;
  currentStep: number;
  totalSteps: number;
}

export function AdminInitialRegister({ onRegistered, onRestart, currentStep, totalSteps }: AdminInitialRegisterProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Cadastra usuário no Supabase sem confirmação extra
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          // Salva nome como metadata extra
          data: { role: "admin", nome },
          // Desativa email_confirmation para acesso direto (em typo real, é necessário no Supabase liberar/autoconfirm)
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
      toast({
        title: "Cadastro realizado!",
        description: "Acesse com seus dados para entrar no painel.",
      });
      setLoading(false);
      onRegistered({ nome, email });
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
          <div className="w-full mb-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          <CardTitle className="mb-1 text-2xl font-extrabold text-blue-800 tracking-tight">
            Cadastro Inicial do Administrador
          </CardTitle>
          <div className="text-blue-500 text-xs text-center mb-2">
            Informe seus dados para criar sua conta de acesso ao painel.
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full mb-2 p-1 text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
            onClick={onRestart}
            disabled={loading}
          >Reiniciar fluxo</Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCadastro} className="flex flex-col gap-6 mt-2">
            <div>
              <Label htmlFor="nome" className="text-blue-900 mb-1 block">
                Nome completo
              </Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                disabled={loading}
                onChange={e => setNome(e.target.value)}
                className="bg-blue-50 border-blue-200 placeholder:text-blue-300 focus:border-blue-600 text-blue-900"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-blue-900 mb-1 block">
                E-mail (login)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={e => setEmail(e.target.value)}
                className="bg-blue-50 border-blue-200 placeholder:text-blue-300 focus:border-blue-600 text-blue-900"
                placeholder="Digite seu e-mail"
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
                placeholder="Crie uma senha"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-800 hover:bg-blue-900 transition text-white text-base font-bold rounded-lg shadow"
            >
              {loading ? "Registrando..." : "Cadastrar"}
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

// Barra de progresso
function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full flex items-center gap-1 mb-3">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded ${i < currentStep ? "bg-blue-500" : "bg-blue-200"}`}
        />
      ))}
    </div>
  );
}
