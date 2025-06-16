
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginWithEmail } from "@/utils/supabase-auth";
import { Loader2, LogIn } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export function AdminLogin({ onLogin, onGoToRegister }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: loginError } = await loginWithEmail(email, password);
      
      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (data.user) {
        onLogin();
      }
    } catch (err) {
      setError("Erro inesperado durante o login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border border-blue-200/20 bg-white/10 backdrop-blur-lg">
      <CardHeader className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Painel Administrativo
        </CardTitle>
        <CardDescription className="text-blue-200">
          Faça login para acessar o sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
              className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200 focus:border-blue-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200 focus:border-blue-400"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-200">
            Não tem uma conta?{" "}
            <button
              onClick={onGoToRegister}
              className="text-blue-300 hover:text-blue-100 font-medium underline"
              disabled={loading}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
