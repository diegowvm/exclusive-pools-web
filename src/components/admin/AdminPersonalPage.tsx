
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminPersonalPageProps {
  userData: { nome: string; email: string; cargo: string };
  onContinue: () => void;
}

export function AdminPersonalPage({ userData, onContinue }: AdminPersonalPageProps) {
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
            Dados do Cadastro Inicial
          </CardTitle>
          <div className="text-blue-500 text-sm text-center">
            Confira seus dados cadastrados. Confirme no e-mail recebido!
          </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
