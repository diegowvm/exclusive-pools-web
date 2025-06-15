
import React from "react";
import { Client } from "./ClientsTable";
import { Button } from "@/components/ui/button";

export function ClientDetails({
  client,
  onClose,
  onEdit,
}: {
  client: Client;
  onClose: () => void;
  onEdit: (client: Client) => void;
}) {
  return (
    <div className="p-4 border rounded-lg bg-white max-w-lg w-full mx-auto shadow mb-3">
      <h3 className="text-xl font-bold mb-2 text-premium-black">{client.companyName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
        <div><b>CNPJ:</b> {client.cnpj}</div>
        <div><b>Contato:</b> {client.contactName}</div>
        <div><b>Email:</b> {client.email}</div>
        <div><b>Telefone:</b> {client.phone}</div>
        <div><b>Setor:</b> {client.sector}</div>
        <div><b>Cidade:</b> {client.city}</div>
        <div><b>Estado:</b> {client.state}</div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
        <Button onClick={() => onEdit(client)}>Editar</Button>
      </div>
    </div>
  );
}
