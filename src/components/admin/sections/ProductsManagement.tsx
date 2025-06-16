
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRole } from "@/contexts/UserRoleContext";

export function ProductsManagement() {
  const { hasPermission } = useUserRole();

  if (!hasPermission('all') && !hasPermission('products')) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-slate-500">Você não tem permissão para acessar esta seção.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestão de Produtos</h1>
          <p className="text-slate-600 dark:text-slate-400">Gerencie seu catálogo de produtos</p>
        </div>
        
        {hasPermission('all') && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Buscar produtos..." 
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-full h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <CardTitle className="text-lg">Produto {item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">
                Descrição do produto que será exibida no catálogo.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">R$ 1.299,00</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  {hasPermission('all') && (
                    <Button size="sm" variant="destructive">Excluir</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Estatísticas de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">48</div>
              <p className="text-sm text-slate-600">Total de Produtos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">42</div>
              <p className="text-sm text-slate-600">Produtos Ativos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <p className="text-sm text-slate-600">Produtos Inativos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-sm text-slate-600">Em Destaque</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
