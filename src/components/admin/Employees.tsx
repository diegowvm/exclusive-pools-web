
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export function Employees() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "" });

  // Sempre selecionar somente campos necessários!
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

  // Você pode adicionar edição e remoção similar ao addEmployee

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Funcionários</h2>
        <Button variant="default" onClick={() => setShowAdd((v) => !v)}>
          + Novo Funcionário
        </Button>
      </div>
      {showAdd && (
        <div className="bg-white p-4 rounded mb-4 shadow">
          <input
            className="border px-2 py-1 rounded mr-2"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="border px-2 py-1 rounded mr-2"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            className="border px-2 py-1 rounded mr-2"
            placeholder="Cargo"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          />
          <Button size="sm" onClick={addEmployee} disabled={loading}>
            Salvar
          </Button>
        </div>
      )}

      <div className="bg-white rounded shadow p-4">
        {loading && <div>Carregando...</div>}
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {list.map((emp) => (
              <tr key={emp.id}>
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
    </div>
  );
}
