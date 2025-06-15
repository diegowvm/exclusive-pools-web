
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  FileText, 
  Download,
  Calendar,
  PieChart
} from "lucide-react";

export function FinancialSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Painel Financeiro</h1>
          <p className="text-slate-600 dark:text-slate-400">Controle completo das finanças da empresa</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Este Mês
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">R$ 234.500</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+15.3% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">R$ 45.200</div>
            <div className="flex items-center mt-1">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-xs text-red-600">+5.2% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              Lucro Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">R$ 189.300</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">+18.7% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-centers gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              Pendente Receber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">R$ 12.800</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-purple-600">23 faturas pendentes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Fluxo de Caixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Entradas do mês</span>
                <span className="font-semibold text-green-600">R$ 234.500</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm">Saídas do mês</span>
                <span className="font-semibold text-red-600">R$ 45.200</span>
              </div>
              <Progress value={25} className="h-2" />
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Saldo Líquido</span>
                  <span className="font-bold text-blue-600">R$ 189.300</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Métodos de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: "Cartão de Crédito", amount: "R$ 156.300", percentage: 67 },
                { method: "PIX", amount: "R$ 45.200", percentage: 19 },
                { method: "Boleto", amount: "R$ 32.000", percentage: 14 }
              ].map((payment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{payment.method}</span>
                    <span className="text-sm font-semibold">{payment.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={payment.percentage} className="h-2 flex-1" />
                    <span className="text-xs text-slate-500 w-8">{payment.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Transações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "Entrada", description: "Venda - Pedido #12547", amount: "+R$ 8.999,99", time: "há 5 min" },
              { type: "Entrada", description: "Venda - Pedido #12546", amount: "+R$ 15.800,00", time: "há 12 min" },
              { type: "Saída", description: "Fornecedor - Material", amount: "-R$ 2.500,00", time: "há 1h" },
              { type: "Entrada", description: "Venda - Pedido #12545", amount: "+R$ 6.780,50", time: "há 2h" }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === "Entrada" 
                      ? "bg-green-100 dark:bg-green-900/20" 
                      : "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    {transaction.type === "Entrada" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{transaction.time}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === "Entrada" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
