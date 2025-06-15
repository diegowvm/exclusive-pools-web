
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function Notifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Pegando apenas campos necessários!
      const { data, error } = await supabase
        .from("admin_notifications")
        .select("id, titulo, conteudo, data")
        .order("data", { ascending: false });
      if (!error) setList(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notificações Internas</h2>
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <span>Carregando...</span>
        ) : (
          <ul>
            {list.map((n) => (
              <li key={n.id} className="mb-3">
                <span className="font-semibold">{n.titulo}</span>
                <div className="text-gray-600 text-sm">{n.conteudo}</div>
                <div className="text-xs text-gray-400">
                  {new Date(n.data).toLocaleString("pt-BR")}
                </div>
              </li>
            ))}
            {!list.length && (
              <li className="text-gray-400 text-center py-4">
                Sem notificações ainda.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
