
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics & Relatórios</h1>
        <p className="text-slate-600 dark:text-slate-400">Análises avançadas e relatórios detalhados</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Central de Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Analytics Avançado em Desenvolvimento
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Em breve: relatórios de vendas, comportamento do cliente, performance de produtos e muito mais
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
