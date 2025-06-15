
import React, { useState } from "react";
import { products as allProductsMock } from "@/data/products";
import { Pencil, Eye, EyeOff, Star, Trash, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  oculto: boolean;
  destaque: boolean;
};

type EditableProduct = ProductItem & { isEditing?: boolean; localImage?: string };

const CATALOG_CONFIGS: Record<string, { name: string; category: string }> = {
  "catalog-piscinas": { name: "Piscinas", category: "piscinas" },
  "catalog-banheiras": { name: "Banheiras", category: "banheiras" },
  "catalog-spa": { name: "Spas", category: "spas" },
  "catalog-equipamentos": { name: "Equipamentos", category: "equipamentos" },
};

export default function CatalogSection({ activeCatalog }: { activeCatalog: string }) {
  const config = CATALOG_CONFIGS[activeCatalog];
  const [catalog, setCatalog] = useState<EditableProduct[]>(
    ((allProductsMock[config.category] || []) as ProductItem[]).map(
      (p) => ({ ...p, isEditing: false, localImage: undefined })
    )
  );
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
    toast({ title: "Produto salvo!", description: "As alterações foram salvas." });
  };

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

  // Ocultar/Mostrar produto
  const toggleOculto = (id: string) => {
    setCatalog((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, oculto: !p.oculto } : p
      )
    );
  };

  // Destacar/Remover destaque
  const toggleDestaque = (id: string) => {
    setCatalog((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, destaque: !p.destaque } : p
      )
    );
  };

  // Excluir produto
  const excluirProduto = (id: string) => {
    setCatalog((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Produto excluído!", description: "O produto foi removido da lista." });
  };

  return (
    <div>
      <h3 className="text-lg font-extrabold mb-4">
        Edição de Catálogo - {config?.name}
      </h3>
      <p className="mb-4">
        Edite ou gerencie os produtos de <b>{config?.name}</b>: nome, descrição, imagens, ficha técnica, ocultar, destacar ou excluir.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {catalog.map((product) => (
          <Card key={product.id} className={`relative group border-2 ${product.destaque ? "border-yellow-400" : "border-slate-200"} ${product.oculto ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex justify-between items-start gap-1">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <span className="text-xs bg-gray-100 rounded px-2 py-0.5 text-premium-gray">{product.category}</span>
                  {product.destaque && <span className="ml-2 inline-flex items-center bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded gap-1"><Star size={14} />Destaque</span>}
                  {product.oculto && <span className="ml-2 inline-flex items-center bg-slate-300 text-slate-600 text-xs px-2 py-0.5 rounded gap-1"><EyeOff size={14} />Oculto</span>}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded-full hover:bg-aqua/10"
                    onClick={() => startEdit(product.id)}
                  ><Pencil size={18} /></Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`p-2 rounded-full ${product.oculto ? "bg-slate-200" : "hover:bg-slate-100"}`}
                    onClick={() => toggleOculto(product.id)}
                  >{product.oculto ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                  <Button
                    variant={product.destaque ? "secondary" : "ghost"}
                    size="icon"
                    className={`p-2 rounded-full ${product.destaque ? "bg-yellow-100" : "hover:bg-yellow-50"}`}
                    onClick={() => toggleDestaque(product.id)}
                  ><Star size={18} className={product.destaque ? "fill-yellow-400 text-yellow-500" : ""} /></Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded-full hover:bg-red-100 text-red-500"
                    onClick={() => excluirProduto(product.id)}
                  ><Trash size={18} /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === product.id ? (
                <div>
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
                </div>
              ) : (
                <div>
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
                </div>
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
