
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export function EditContent() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProdutos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("produtos")
      .select("id, nome, preco, descricao, imagem_url")
      .order("nome");
    if (!error) setProdutos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProdutos();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Gerenciar Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {produtos.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-100 p-4 rounded shadow flex gap-4"
            >
              <img
                src={p.imagem_url}
                alt={p.nome}
                className="w-32 h-24 object-cover rounded border"
              />
              <div>
                <div className="font-semibold text-premium-black">
                  {p.nome}
                </div>
                <div className="text-gray-500 mb-1">{p.descricao}</div>
                <div className="text-green-700 font-bold">{p.preco}</div>
                {/* Botões para editar/remover/propriedades extras podem ser adicionados aqui */}
              </div>
            </div>
          ))}
          {!produtos.length && !loading && (
            <div className="text-gray-400">Nenhum produto registrado.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
