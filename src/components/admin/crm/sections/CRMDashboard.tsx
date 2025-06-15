
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target
} from "lucide-react";

export function CRMDashboard() {
  // Dados simulados - em produção viriam do Supabase
  const metrics = {
    revenue: { value: "R$ 45.230", change: 12.5, period: "vs mês anterior" },
    orders: { value: "1,247", change: 8.3, period: "vs mês anterior" },
    customers: { value: "89", change: 15.2, period: "novos este mês" },
    conversion: { value: "3.2%", change: -2.1, period: "vs mês anterior" }
  };

  const recentOrders = [
    { id: "#12547", customer: "João Silva", value: "R$ 1.250", status: "Pago", time: "há 5 min" },
    { id: "#12546", customer: "Maria Santos", value: "R$ 890", status: "Pendente", time: "há 12 min" },
    { id: "#12545", customer: "Pedro Costa", value: "R$ 2.100", status: "Processando", time: "há 23 min" },
    { id: "#12544", customer: "Ana Oliveira", value: "R$ 750", status: "Entregue", time: "há 1h" }
  ];

  const topProducts = [
    { name: "Piscina de Fibra 6x3", sales: 23, revenue: "R$ 206.900" },
    { name: "Spa Luxo Cromoterapia", sales: 12, revenue: "R$ 189.600" },
    { name: "Banheira Hidromassagem", sales: 18, revenue: "R$ 122.051" },
    { name: "Filtro Nautilus F350P", sales: 45, revenue: "R$ 33.750" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Visão geral do seu negócio em tempo real</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Últimos 30 dias
          </Button>
          <Button size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Ver Relatório Completo
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{metrics.revenue.value}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+{metrics.revenue.change}% {metrics.revenue.period}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{metrics.orders.value}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">+{metrics.orders.change}% {metrics.orders.period}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{metrics.customers.value}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600">+{metrics.customers.change}% {metrics.customers.period}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa Conversão</CardTitle>
            <Target className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{metrics.conversion.value}</div>
            <div className="flex items-center mt-1">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-xs text-red-600">{metrics.conversion.change}% {metrics.conversion.period}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos Recentes */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Pedidos Recentes
              </CardTitle>
              <Button variant="ghost" size="sm">
                Ver Todos
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-white">{order.id}</span>
                      <Badge variant={
                        order.status === "Pago" ? "default" :
                        order.status === "Pendente" ? "secondary" :
                        order.status === "Processando" ? "outline" : "default"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{order.customer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900 dark:text-white">{order.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Produtos */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Top Produtos
              </CardTitle>
              <Button variant="ghost" size="sm">
                Ver Relatório
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Performance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Meta Mensal</span>
              <span className="text-sm font-medium">R$ 50.000</span>
            </div>
            <Progress value={90} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">90% da meta atingida</span>
              <span className="text-green-600 dark:text-green-400 font-medium">R$ 45.230</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
