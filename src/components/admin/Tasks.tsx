
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

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
    <div>
      <h2 className="text-xl font-semibold mb-2">Tarefas Administrativas</h2>
      <div className="flex gap-2 mb-4">
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
      <div className="bg-white rounded shadow p-4">
        <ul>
          {list.map((t) => (
            <li key={t.id} className="mb-2">
              <span className="font-semibold">{t.nome}</span>
              <span className="ml-2 text-gray-500">{t.descricao}</span>
              <span className="ml-2 text-xs rounded px-2 py-1 bg-slate-100">
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
    </div>
  );
}
