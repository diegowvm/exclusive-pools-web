
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
}

export function ProductModal({ isOpen, onClose, editingProduct }: ProductModalProps) {
  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
    toast({
      title: editingProduct ? "Produto atualizado" : "Produto criado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <Card className="fixed inset-4 z-50 bg-white border-blue-200 shadow-2xl overflow-auto">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-blue-900">
          {editingProduct ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-blue-900">Nome</Label>
            <Input 
              id="name" 
              defaultValue={editingProduct?.name}
              className="border-blue-200 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="category" className="text-blue-900">Categoria</Label>
            <Select defaultValue={editingProduct?.category || 'piscinas'}>
              <SelectTrigger className="border-blue-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piscinas">Piscinas</SelectItem>
                <SelectItem value="spas">Spas</SelectItem>
                <SelectItem value="banheiras">Banheiras</SelectItem>
                <SelectItem value="equipamentos">Equipamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-blue-900">Preço</Label>
            <Input 
              id="price" 
              defaultValue={editingProduct?.price}
              className="border-blue-200 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-blue-900">URL da Imagem</Label>
            <Input 
              id="image" 
              defaultValue={editingProduct?.image}
              className="border-blue-200 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-blue-900">Descrição</Label>
          <Textarea 
            id="description" 
            defaultValue={editingProduct?.description}
            className="border-blue-200 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch />
              <Label className="text-blue-900">Produto Visível</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <Label className="text-blue-900">Produto em Destaque</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-blue-200 text-blue-600"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingProduct ? 'Atualizar' : 'Criar'} Produto
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
