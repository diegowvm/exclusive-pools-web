
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

// Exemplo para produtos, mas pode adicionar para outras tabelas (serviços, imagens, textos, etc)
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Gerenciar Produtos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {produtos.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded mb-2 shadow flex gap-4">
            <img
              src={p.imagem_url}
              alt={p.nome}
              className="w-32 h-24 object-cover rounded"
            />
            <div>
              <div className="font-semibold">{p.nome}</div>
              <div className="text-gray-500 mb-1">{p.descricao}</div>
              <div className="text-green-700 font-bold">{p.preco}</div>
              {/* Aqui você pode adicionar botões para editar/remover/propriedades extras */}
            </div>
          </div>
        ))}
        {!produtos.length && !loading && (
          <div className="text-gray-400">Nenhum produto registrado.</div>
        )}
      </div>
    </div>
  );
}
