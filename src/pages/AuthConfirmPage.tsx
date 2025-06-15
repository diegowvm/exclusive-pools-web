
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

export default function AuthConfirmPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Confirmando o e-mail...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [helpInfo, setHelpInfo] = useState<string | null>(null);

  useEffect(() => {
    async function confirm() {
      // Supabase envia o access_token e refresh_token na query string para confirmação de email
      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");
      const type = searchParams.get("type"); // ex: signup, email_change, etc

      if (!access_token || !refresh_token) {
        setStatus("error");
        setMessage("URL inválida! Não encontramos o token de autenticação.");
        setHelpInfo(
          "Isso geralmente ocorre quando o link do e-mail de confirmação foi usado fora do ambiente correto ou já expirou. " +
          "Caso o link tenha direcionado para uma página offline, peça para o responsável pela aplicação ajustar as configurações de URL no Supabase. " +
          "Em seguida, solicite um novo e-mail de confirmação ou tente novamente após alguns minutos."
        );
        return;
      }

      // Realiza o login utilizando os tokens recebidos
      const { error } = await supabase.auth.setSession({ access_token, refresh_token });
      if (error) {
        setStatus("error");
        setMessage("Não foi possível confirmar seu e-mail. Tente novamente ou solicite um novo e-mail.");
        toast({
          title: "Erro ao confirmar e-mail",
          description: error.message,
        });
        return;
      }

      setStatus("success");
      setMessage("E-mail confirmado com sucesso! Agora você pode prosseguir para o painel.");

      // Opcional: redireciona após um tempo
      setTimeout(() => {
        navigate("/adminpiscinas");
      }, 2500);
    }

    confirm();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-xl bg-white/95">
        <CardHeader className="flex flex-col items-center">
          <img
            src="/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png"
            alt="Logo Exclusive Piscinas"
            className="h-20 w-20 mb-3 rounded-full shadow-lg bg-white p-2 object-contain border-4 border-blue-300"
            draggable={false}
          />
          <CardTitle className="mb-1 text-2xl font-extrabold text-blue-800 tracking-tight">
            Confirmação de E-mail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-center text-lg font-semibold ${status === "success" ? "text-blue-800" : status === "error" ? "text-red-600" : "text-blue-500"}`}>
            {message}
          </div>
          {helpInfo && (
            <div className="mt-4 text-sm text-gray-700 bg-yellow-100 border border-yellow-300 rounded p-3">
              {helpInfo}
            </div>
          )}
          {status === "success" && (
            <Button className="mt-6 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold"
              onClick={() => navigate("/adminpiscinas")}>
              Ir para o painel
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

