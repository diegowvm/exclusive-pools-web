
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  CreditCard,
  Eye,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";

const salesData = [
  { name: 'Jan', vendas: 4000, orcamentos: 2400 },
  { name: 'Fev', vendas: 3000, orcamentos: 1398 },
  { name: 'Mar', vendas: 2000, orcamentos: 9800 },
  { name: 'Abr', vendas: 2780, orcamentos: 3908 },
  { name: 'Mai', vendas: 1890, orcamentos: 4800 },
  { name: 'Jun', vendas: 2390, orcamentos: 3800 },
];

const trafficData = [
  { name: 'Desktop', value: 60, color: '#3B82F6' },
  { name: 'Mobile', value: 35, color: '#10B981' },
  { name: 'Tablet', value: 5, color: '#F59E0B' },
];

const recentActivities = [
  { id: 1, type: 'order', message: 'Novo pedido #1234 recebido', time: '2 minutos atrás', status: 'success' },
  { id: 2, type: 'customer', message: 'Cliente João Silva cadastrado', time: '15 minutos atrás', status: 'info' },
  { id: 3, type: 'payment', message: 'Pagamento de R$ 2.500 confirmado', time: '30 minutos atrás', status: 'success' },
  { id: 4, type: 'quote', message: 'Orçamento #5678 enviado', time: '1 hora atrás', status: 'warning' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard Executivo
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Visão geral completa do seu negócio
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Últimos 30 dias
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Eye className="h-4 w-4" />
            Relatório Completo
          </Button>
        </div>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Receita Total</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">R$ 125.430</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">vs mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-blue-600 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Pedidos</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">847</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+8.2%</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">vs mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-green-600 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Clientes</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">2.547</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+5.4%</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">vs mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-purple-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Conversão</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">3.24%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">-1.2%</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">vs mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-orange-600 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Vendas vs Orçamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#3B82F6" name="Vendas" />
                <Bar dataKey="orcamentos" fill="#10B981" name="Orçamentos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Tráfego por Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2" variant="outline">
              <ShoppingCart className="h-4 w-4" />
              Novo Pedido
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Users className="h-4 w-4" />
              Adicionar Cliente
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <CreditCard className="h-4 w-4" />
              Registrar Pagamento
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Eye className="h-4 w-4" />
              Ver Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
