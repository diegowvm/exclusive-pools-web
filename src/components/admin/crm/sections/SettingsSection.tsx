
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações do Sistema</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure permissões, integrações e configurações gerais</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Configurações Avançadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Configurações do Sistema em Desenvolvimento
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Em breve: permissões de usuário, integrações com Stripe/Mercado Pago, configurações da empresa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
