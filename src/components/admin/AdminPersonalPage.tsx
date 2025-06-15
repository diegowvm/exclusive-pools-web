
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

interface AdminPersonalPageProps {
  userData: { nome: string; email: string; cargo: string };
  onContinue: () => void;
  onRestart: () => void;
  currentStep: number;
  totalSteps: number;
}

export function AdminPersonalPage({ userData, onContinue, onRestart, currentStep, totalSteps }: AdminPersonalPageProps) {
  const [sending, setSending] = useState(false);

  // Função para reenviar e-mail de confirmação
  async function handleResend() {
    setSending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: userData.email,
      });
      if (error) {
        toast({
          title: "Erro ao reenviar",
          description: error.message || "Não foi possível reenviar o e-mail.",
        });
      } else {
        toast({
          title: "E-mail reenviado!",
          description: "Verifique sua caixa de entrada (incluindo spam).",
        });
      }
    } catch (e) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em instantes.",
      });
    }
    setSending(false);
  }

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
            Dados do Cadastro Inicial
          </CardTitle>
          <div className="text-blue-500 text-xs text-center">
            Confira seus dados cadastrados.<br />
            <span className="italic text-slate-500">
              Confirme o e-mail recebido antes de prosseguir e clique em "Prosseguir para autenticação".
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-3 p-1 text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
            onClick={onRestart}
          >Reiniciar fluxo</Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-2">
          <div>
            <span className="text-blue-900 font-semibold">Nome:</span>{" "}
            <span className="text-premium-black">{userData.nome}</span>
          </div>
          <div>
            <span className="text-blue-900 font-semibold">Cargo:</span>{" "}
            <span className="text-premium-black">{userData.cargo}</span>
          </div>
          <div>
            <span className="text-blue-900 font-semibold">E-mail:</span>{" "}
            <span className="text-premium-black">{userData.email}</span>
          </div>
          <Button
            className="mt-4 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold"
            onClick={onContinue}
          >
            Prosseguir para autenticação
          </Button>
          <Button
            type="button"
            className="mt-2 w-full bg-blue-200 hover:bg-blue-300 text-blue-900"
            variant="secondary"
            disabled={sending}
            onClick={handleResend}
          >
            {sending ? "Reenviando..." : "Reenviar e-mail de autenticação"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Barra de progresso (igual do registro)
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

