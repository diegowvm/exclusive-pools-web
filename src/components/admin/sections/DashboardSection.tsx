
export function DashboardSection() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-premium-black dark:text-white mb-6">Bem-vindo ao Painel Administrativo</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 bg-aqua-50 rounded-lg shadow">
          <h3 className="font-bold text-premium-black mb-2">Visão Geral</h3>
          <p className="text-premium-gray text-sm">Indicadores principais da sua empresa aparecerão aqui.</p>
        </div>
        <div className="p-6 bg-aqua-50 rounded-lg shadow">
          <h3 className="font-bold text-premium-black mb-2">Ações Rápidas</h3>
          <p className="text-premium-gray text-sm">Adicione produtos, clientes ou colaboradores facilmente.</p>
        </div>
        <div className="p-6 bg-aqua-50 rounded-lg shadow">
          <h3 className="font-bold text-premium-black mb-2">Notificações</h3>
          <p className="text-premium-gray text-sm">Suas últimas atualizações administrativas aparecerão aqui.</p>
        </div>
      </div>
    </div>
  );
}
