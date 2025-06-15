
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function Workflow() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Definindo só campos necessários!
      const { data, error } = await supabase
        .from("workflow")
        .select("id, status, usuario_nome, descricao, data_criado")
        .order("data_criado", { ascending: false });
      if (!error) setRows(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Fluxo de Trabalho</h2>
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <span>Carregando...</span>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Status</th>
                <th>Usuário</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.status}</td>
                  <td>{r.usuario_nome}</td>
                  <td>{r.descricao}</td>
                  <td>{new Date(r.data_criado).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Nenhum item registrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
