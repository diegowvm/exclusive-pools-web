
import React from "react";
import { User2, Eye } from "lucide-react";

export type Client = {
  id: string;
  companyName: string;
  cnpj: string;
  email: string;
  phone: string;
  contactName: string;
  sector: string;
  city: string;
  state: string;
};

export function ClientsTable({
  clients,
  onSelect,
}: {
  clients: Client[];
  onSelect: (client: Client) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr className="bg-aqua-50 text-premium-black">
            <th className="py-2 px-3 text-left">Empresa</th>
            <th className="py-2 px-3 text-left">CNPJ</th>
            <th className="py-2 px-3 text-left">Contato</th>
            <th className="py-2 px-3 text-left">Setor</th>
            <th className="py-2 px-3 text-left">Cidade</th>
            <th className="py-2 px-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-premium-gray">
                Nenhum cliente cadastrado.
              </td>
            </tr>
          )}
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-aqua-50/50 transition">
              <td className="py-2 px-3">{client.companyName}</td>
              <td className="py-2 px-3">{client.cnpj}</td>
              <td className="py-2 px-3">{client.contactName} <span className="text-xs text-premium-gray">({client.phone})</span></td>
              <td className="py-2 px-3">{client.sector}</td>
              <td className="py-2 px-3">{client.city} / {client.state}</td>
              <td className="py-2 px-3">
                <button
                  onClick={() => onSelect(client)}
                  className="text-aqua hover:underline flex gap-1 items-center"
                >
                  <Eye size={16} />Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
