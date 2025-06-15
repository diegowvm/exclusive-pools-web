
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Employees() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "" });

  async function loadEmployees() {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_employees")
      .select("id, name, email, role")
      .order("name");
    if (!error) setList(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function addEmployee() {
    setLoading(true);
    const { error } = await supabase
      .from("admin_employees")
      .insert([{ name: form.name, role: form.role, email: form.email }]);
    setLoading(false);
    if (!error) {
      setShowAdd(false);
      setForm({ name: "", role: "", email: "" });
      loadEmployees();
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-xl">Funcionários</CardTitle>
          <Button variant="default" onClick={() => setShowAdd((v) => !v)}>
            + Novo Funcionário
          </Button>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <div className="bg-slate-50 p-4 rounded mb-4">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  className="border px-2 py-1 rounded"
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <input
                  className="border px-2 py-1 rounded"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <input
                  className="border px-2 py-1 rounded"
                  placeholder="Cargo"
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                />
                <Button size="sm" onClick={addEmployee} disabled={loading}>
                  Salvar
                </Button>
              </div>
            </div>
          )}
          <div className="rounded">
            {loading && <div>Carregando...</div>}
            <table className="w-full text-left text-premium-gray">
              <thead>
                <tr className="border-b">
                  <th className="py-2 font-semibold text-premium-gray">Nome</th>
                  <th className="font-semibold text-premium-gray">E-mail</th>
                  <th className="font-semibold text-premium-gray">Cargo</th>
                </tr>
              </thead>
              <tbody>
                {list.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-aqua-light/40 transition"
                  >
                    <td className="py-1">{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role}</td>
                  </tr>
                ))}
                {!list.length && !loading && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-400">
                      Nenhum funcionário registrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
