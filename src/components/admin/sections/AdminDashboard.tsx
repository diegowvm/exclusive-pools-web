
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";

export function AdminDashboard() {
  const { userRole, hasPermission } = useUserRole();

  const stats = [
    {
      title: "Total de Usuários",
      value: "152",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      show: hasPermission('all') || hasPermission('customers')
    },
    {
      title: "Produtos",
      value: "48",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
      show: hasPermission('all') || hasPermission('products')
    },
    {
      title: "Pedidos",
      value: "23",
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      show: hasPermission('all') || hasPermission('orders')
    },
    {
      title: "Receita Mensal",
      value: "R$ 12.450",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      show: hasPermission('all') || hasPermission('financial')
    }
  ];

  const visibleStats = stats.filter(stat => stat.show);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard - {userRole === 'admin' ? 'Administrador' : userRole === 'financeiro' ? 'Financeiro' : 'Vendedor'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Bem-vindo ao painel de controle do sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleStats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo pedido recebido</p>
                  <p className="text-xs text-slate-500">há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Produto adicionado ao catálogo</p>
                  <p className="text-xs text-slate-500">há 1 hora</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo usuário registrado</p>
                  <p className="text-xs text-slate-500">há 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {hasPermission('all') && (
                <button className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Gerenciar Usuários</p>
                    <p className="text-xs text-slate-500">Controle de acesso e permissões</p>
                  </div>
                </button>
              )}
              
              {(hasPermission('all') || hasPermission('products')) && (
                <button className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Catálogo de Produtos</p>
                    <p className="text-xs text-slate-500">Adicionar e editar produtos</p>
                  </div>
                </button>
              )}
              
              {(hasPermission('all') || hasPermission('orders')) && (
                <button className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Pedidos</p>
                    <p className="text-xs text-slate-500">Gerenciar vendas e pedidos</p>
                  </div>
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
