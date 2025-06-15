
import React, { useState } from "react";
import { ClientsTable, Client } from "./Clients/ClientsTable";
import { ClientForm } from "./Clients/ClientForm";
import { ClientDetails } from "./Clients/ClientDetails";
import { Button } from "@/components/ui/button";

export function ClientsSection() {
  // Mock inicial - substituir por banco real com Supabase
  const [clients, setClients] = useState<Client[]>([]);
  const [selected, setSelected] = useState<Client | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);

  function handleAdd(c: Client) {
    setClients(clients => [...clients, c]);
    setAddMode(false);
  }

  function handleEditSave(client: Client) {
    setClients(clients => clients.map(c => c.id === client.id ? client : c));
    setEditing(null);
    setSelected(client);
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2 text-premium-black dark:text-white">CRM — Gestão de Clientes</h2>
      <p className="text-premium-gray mb-3">Registre, pesquise e mantenha o histórico dos seus clientes empresariais.</p>

      {addMode ? (
        <ClientForm onSave={handleAdd} onCancel={() => setAddMode(false)} />
      ) : editing ? (
        <ClientForm initial={editing} onSave={handleEditSave} onCancel={() => setEditing(null)} />
      ) : selected ? (
        <ClientDetails
          client={selected}
          onClose={() => setSelected(null)}
          onEdit={(cli) => setEditing(cli)}
        />
      ) : (
        <>
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddMode(true)} className="gradient-aqua text-white">
              Novo Cliente
            </Button>
          </div>
          <ClientsTable clients={clients} onSelect={setSelected} />
        </>
      )}
    </div>
  );
}
