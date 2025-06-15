
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Notifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Notificações Internas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white/80 rounded p-1">
          {loading ? (
            <span>Carregando...</span>
          ) : (
            <ul>
              {list.map((n) => (
                <li key={n.id} className="mb-3 border-b last:border-b-0 pb-3">
                  <span className="font-semibold text-premium-black">
                    {n.titulo}
                  </span>
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
      </CardContent>
    </Card>
  );
}
