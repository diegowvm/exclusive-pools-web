
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Zap, Bell, Tag } from "lucide-react";

export function MarketingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Marketing & Campanhas</h1>
        <p className="text-slate-600 dark:text-slate-400">Automatize e gerencie suas campanhas de marketing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Campanhas Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8.5%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa Abertura</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">234</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Notificações Enviadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">15</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Cupons Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Marketing e Automação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Plataforma de Marketing em Desenvolvimento
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Em breve: campanhas de e-mail, notificações push, cupons de desconto e automação completa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
