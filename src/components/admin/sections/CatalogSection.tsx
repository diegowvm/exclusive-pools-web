
import { useState } from "react";
import { Pencil, Image as ImageIcon, Upload } from "lucide-react";
import { products } from "@/data/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type EditableProduct = ProductItem & { isEditing?: boolean, localImage?: string };

export function CatalogSection() {
  // Unir todos os produtos de todas as categorias, já que produtos é um objeto com arrays
  const allProducts: ProductItem[] = Object.values(products).flat();

  // Estado local para edição 
  const [catalog, setCatalog] = useState<EditableProduct[]>(
    allProducts.map((p) => ({ ...p, isEditing: false, localImage: undefined }))
  );

  // Armazenar temporariamente edições
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempFields, setTempFields] = useState<Partial<EditableProduct>>({});

  const startEdit = (id: string) => {
    const product = catalog.find((p) => p.id === id);
    if (product) {
      setEditingId(id);
      setTempFields({
        name: product.name,
        description: product.description,
        price: product.price,
        localImage: product.localImage || product.image,
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempFields({});
  };

  const saveEdit = (id: string) => {
    setCatalog((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: tempFields.name ?? p.name,
              description: tempFields.description ?? p.description,
              price: typeof tempFields.price === "number" ? tempFields.price : p.price,
              image: tempFields.localImage || p.image,
            }
          : p
      )
    );
    setEditingId(null);
    setTempFields({});
  };

  // Manipular upload de imagem local (apenas frontend)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTempFields((fields) => ({
        ...fields,
        localImage: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4 text-premium-black dark:text-white flex items-center gap-2">
        <Pencil className="w-5 h-5 text-aqua" /> Gerenciar Catálogo do Site
      </h2>
      <p className="text-premium-gray mb-6 max-w-xl">
        Edite as informações dos produtos exibidos no site. As alterações aqui refletem imediatamente nos cards do frontend.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {catalog.map((product) => (
          <Card key={product.id} className="relative group">
            <CardHeader>
              <div className="flex justify-between items-start gap-1">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <span className="text-xs bg-gray-100 rounded px-2 py-0.5 text-premium-gray">{product.category}</span>
                </div>
                <Button
                  variant="ghost"
                  className="p-2 rounded-full hover:bg-aqua/10"
                  onClick={() => startEdit(product.id)}
                  aria-label="Editar produto"
                >
                  <Pencil size={18} className="text-premium-gray" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === product.id ? (
                <>
                  {/* Imagem atual */}
                  <div className="mb-3 flex flex-col items-center gap-2">
                    <img
                      src={tempFields.localImage || product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover rounded"
                    />
                    <div className="flex gap-2">
                      <label className="bg-aqua/10 px-3 py-1 rounded flex items-center cursor-pointer gap-1 text-aqua font-medium text-xs">
                        <Upload size={16} />
                        <span>Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <input
                        type="text"
                        className="border px-2 py-1 rounded text-xs"
                        value={tempFields.localImage || ""}
                        onChange={(e) =>
                          setTempFields((f) => ({
                            ...f,
                            localImage: e.target.value,
                          }))
                        }
                        placeholder="Ou cole um link da imagem"
                      />
                    </div>
                  </div>
                  {/* Edição dos campos */}
                  <input
                    type="text"
                    className="mb-2 px-2 py-1 border rounded w-full text-base font-semibold"
                    value={tempFields.name || ""}
                    onChange={(e) =>
                      setTempFields((f) => ({
                        ...f,
                        name: e.target.value,
                      }))
                    }
                  />
                  <textarea
                    className="mb-2 px-2 py-1 border rounded w-full text-sm"
                    value={tempFields.description || ""}
                    onChange={(e) =>
                      setTempFields((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                  />
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs">Preço:</span>
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border rounded"
                      value={tempFields.price ?? product.price}
                      min={0}
                      onChange={(e) =>
                        setTempFields((f) => ({
                          ...f,
                          price: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover rounded mb-3"
                  />
                  <div className="text-premium-black font-semibold">{product.name}</div>
                  <div className="text-premium-gray text-sm mb-2">{product.description}</div>
                  <div className="font-bold text-aqua mb-2">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              {editingId === product.id ? (
                <>
                  <Button
                    size="sm"
                    className="gradient-aqua text-white"
                    onClick={() => saveEdit(product.id)}
                  >
                    Salvar
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={cancelEdit}
                  >
                    Cancelar
                  </Button>
                </>
              ) : null}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
