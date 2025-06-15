
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export function ProductsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestão de Produtos</h1>
        <p className="text-slate-600 dark:text-slate-400">Gerencie seu catálogo de produtos</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Catálogo de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Gestão de Produtos em Desenvolvimento
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Em breve: CRUD completo de produtos, gestão de estoque, categorias e preços
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
