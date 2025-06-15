
import React from "react";

// Simulação de opções de edição para cada categoria
const catalogConfigs: Record<string, { name: string }> = {
  "catalog-piscinas": { name: "Piscinas" },
  "catalog-banheiras": { name: "Banheiras" },
  "catalog-spa": { name: "Spas" },
  "catalog-equipamentos": { name: "Equipamentos" },
};

export default function CatalogSection({ activeCatalog }: { activeCatalog: string }) {
  const config = catalogConfigs[activeCatalog];

  // Aqui você poderia renderizar formulários e listas para edição para cada catálogo
  // Por enquanto apresenta só o nome correto para demonstração visual

  return (
    <div>
      <h3 className="text-lg font-extrabold mb-4">
        Edição de Catálogo - {config?.name}
      </h3>
      <p className="mb-4">
        Aqui você poderá editar os elementos de <b>{config?.name}</b>: nome, descrição, imagens, ficha técnica, e adicionar/remover itens.
      </p>
      {/* Renderize aqui a tabela/lista de edição real dos produtos desta categoria */}
      <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 text-center">
        <span className="text-slate-400">[Painel de edição de <b>{config?.name}</b> será implementado aqui]</span>
      </div>
    </div>
  );
}
