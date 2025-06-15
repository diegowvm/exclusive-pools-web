import { useState } from "react";
import { AdminInitialRegister } from "@/components/admin/AdminInitialRegister";
import { AdminPersonalPage } from "@/components/admin/AdminPersonalPage";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/button";

export function AuthFlow({
  isCheckingSession,
  notAdmin,
  onLogin,
  resetRegisterFlow,
}: {
  isCheckingSession: boolean,
  notAdmin: boolean,
  onLogin: () => void,
  resetRegisterFlow: () => void
}) {
  const [cadastroStep, setCadastroStep] = useState<"register" | "login">("register");
  const totalSteps = 2;
  const stepIndex = cadastroStep === "register" ? 1 : 2;

  if (!notAdmin && !isCheckingSession) {
    if (cadastroStep === "register") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
          <div className="w-full max-w-md flex flex-col items-center">
            <AdminInitialRegister
              onRegistered={() => setCadastroStep("login")}
              onRestart={resetRegisterFlow}
              currentStep={stepIndex}
              totalSteps={totalSteps}
            />
          </div>
        </div>
      );
    }
    if (cadastroStep === "login") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
          <div className="w-full max-w-md">
            <ProgressBar currentStep={stepIndex} totalSteps={totalSteps} />
            <AdminLogin onLogin={onLogin} />
            <div className="flex justify-center mt-2">
              <Button
                type="button"
                variant="outline"
                className="text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                onClick={resetRegisterFlow}
              >Reiniciar fluxo</Button>
            </div>
            <div className="text-xs text-center text-slate-500 mt-2">
              Dica: caso enfrente problemas, reinicie o fluxo e/ou limpe o cache do navegador.
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
}

// ProgressBar component import
import { ProgressBar } from "./ProgressBar";
