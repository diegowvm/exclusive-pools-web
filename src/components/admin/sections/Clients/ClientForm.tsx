
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Client } from "./ClientsTable";

type ClientFormProps = {
  initial?: Partial<Client>;
  onSave: (client: Client) => void;
  onCancel: () => void;
};

export function ClientForm({ initial = {}, onSave, onCancel }: ClientFormProps) {
  const [form, setForm] = useState<Client>({
    id: initial.id || Math.random().toString(16).slice(2),
    companyName: initial.companyName || "",
    cnpj: initial.cnpj || "",
    email: initial.email || "",
    phone: initial.phone || "",
    contactName: initial.contactName || "",
    sector: initial.sector || "",
    city: initial.city || "",
    state: initial.state || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="p-4 bg-aqua-50 rounded-lg mb-3 shadow" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block font-medium mb-1">Razão Social*</label>
          <input
            name="companyName"
            className="input px-2 py-1 border rounded w-full"
            value={form.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">CNPJ*</label>
          <input
            name="cnpj"
            className="input px-2 py-1 border rounded w-full"
            value={form.cnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email*</label>
          <input
            name="email"
            className="input px-2 py-1 border rounded w-full"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Telefone*</label>
          <input
            name="phone"
            className="input px-2 py-1 border rounded w-full"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Nome do Contato*</label>
          <input
            name="contactName"
            className="input px-2 py-1 border rounded w-full"
            value={form.contactName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Setor</label>
          <input
            name="sector"
            className="input px-2 py-1 border rounded w-full"
            value={form.sector}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Cidade</label>
          <input
            name="city"
            className="input px-2 py-1 border rounded w-full"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Estado</label>
          <input
            name="state"
            className="input px-2 py-1 border rounded w-full"
            value={form.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" className="gradient-aqua text-white">Salvar</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  );
}
