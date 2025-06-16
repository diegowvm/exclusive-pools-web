
import { useState } from "react";
import { AdminInitialRegister } from "@/components/admin/AdminInitialRegister";
import { AdminLogin } from "@/components/admin/AdminLogin";

// Adiciona enum para melhor legibilidade das etapas
type Step = "login" | "register";

export function AuthFlow({
  isCheckingSession,
  notAdmin,
  onLogin,
  resetRegisterFlow,
}: {
  isCheckingSession: boolean;
  notAdmin: boolean;
  onLogin: () => void;
  resetRegisterFlow: () => void;
}) {
  const [step, setStep] = useState<Step>("login");

  if (!notAdmin && !isCheckingSession) {
    if (step === "register") {
      return (
        <AdminInitialRegister
          onRegistered={() => setStep("login")}
          onGoToLogin={() => setStep("login")}
        />
      );
    }
    if (step === "login") {
      return (
        <AdminLogin
          onLogin={onLogin}
          onGoToRegister={() => setStep("register")}
        />
      );
    }
  }
  return null;
}
