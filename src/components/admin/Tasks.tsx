
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export function Tasks() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ nome: "", descricao: "" });
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_tasks")
      .select("id, nome, descricao, status")
      .order("id");
    if (!error) setList(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createTask() {
    setLoading(true);
    await supabase.from("admin_tasks").insert([form]);
    setForm({ nome: "", descricao: "" });
    load();
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Tarefas Administrativas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            className="border px-2 py-1 rounded"
            placeholder="Título"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
          <Button disabled={loading} onClick={createTask}>
            Adicionar
          </Button>
        </div>
        <div className="bg-white/90 rounded p-2">
          <ul>
            {list.map((t) => (
              <li
                key={t.id}
                className="mb-2 flex flex-wrap gap-x-2 gap-y-0.5 border-b last:border-b-0 py-2"
              >
                <span className="font-semibold text-premium-black">
                  {t.nome}
                </span>
                <span className="ml-2 text-gray-500">{t.descricao}</span>
                <span className="ml-2 text-xs rounded px-2 py-1 bg-aqua-light">
                  {t.status}
                </span>
              </li>
            ))}
            {!list.length && (
              <li className="text-gray-400 text-center py-4">
                Sem tarefas registradas.
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
