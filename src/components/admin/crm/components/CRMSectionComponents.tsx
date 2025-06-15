
// Importação dinâmica das seções do CRM
import { CRMDashboard } from "../sections/CRMDashboard";
import { DesignSiteSection } from "../sections/DesignSiteSection";
import { OrdersSection } from "../sections/OrdersSection";
import { CustomersSection } from "../sections/CustomersSection";
import { FinancialSection } from "../sections/FinancialSection";
import { SupportSection } from "../sections/SupportSection";
import { MarketingSection } from "../sections/MarketingSection";
import { ProductsSection } from "../sections/ProductsSection";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { SettingsSection } from "../sections/SettingsSection";

// Importando componentes de design do site existentes
import { DesignSection } from "../../sections/DesignSection";
import CatalogSection from "../../sections/ProjectSection/CatalogSection";

// Criando seções placeholder para funcionalidades em desenvolvimento
const PlaceholderSection = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-soft p-8">
    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">🚧</span>
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-center max-w-md">{description}</p>
    <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
      Em desenvolvimento
    </div>
  </div>
);

export const sectionComponents = {
  dashboard: CRMDashboard,
  
  // Design do Site - Seção principal totalmente funcional
  "design-site": DesignSiteSection,
  "design-layout": () => <div className="p-6"><DesignSection /></div>,
  "design-logo": () => <div className="p-6"><DesignSection /></div>,
  "design-colors": () => <div className="p-6"><DesignSection /></div>,
  "design-carousel": () => <div className="p-6"><DesignSection /></div>,
  "design-content": () => <div className="p-6 bg-white rounded-xl shadow-soft"><div className="mb-6"><h3 className="text-lg font-bold mb-4">Edição de Conteúdo e Textos</h3><p className="text-gray-600">Configure todos os textos, títulos, descrições e conteúdo das páginas do site.</p></div></div>,
  "design-catalogs": () => <div className="p-6"><CatalogSection activeCatalog="catalog-piscinas" /></div>,
  
  // Catálogos
  "catalog-piscinas": () => <div className="p-6"><CatalogSection activeCatalog="catalog-piscinas" /></div>,
  "catalog-banheiras": () => <div className="p-6"><CatalogSection activeCatalog="catalog-banheiras" /></div>,
  "catalog-spa": () => <div className="p-6"><CatalogSection activeCatalog="catalog-spa" /></div>,
  "catalog-equipamentos": () => <div className="p-6"><CatalogSection activeCatalog="catalog-equipamentos" /></div>,
  
  // Vendas - Algumas funcionais, outras em desenvolvimento
  orders: OrdersSection,
  quotes: () => <PlaceholderSection title="Orçamentos" description="Sistema de criação e gerenciamento de orçamentos personalizados para clientes." />,
  "payment-status": () => <PlaceholderSection title="Status de Pagamento" description="Acompanhamento em tempo real do status dos pagamentos e transações." />,
  shipping: () => <PlaceholderSection title="Entregas" description="Gerenciamento completo de entregas e logística de produtos." />,
  
  // Financeiro
  revenue: FinancialSection,
  expenses: () => <PlaceholderSection title="Despesas" description="Controle detalhado de todas as despesas operacionais da empresa." />,
  invoices: () => <PlaceholderSection title="Notas Fiscais" description="Emissão e gerenciamento de notas fiscais eletrônicas." />,
  reports: () => <PlaceholderSection title="Relatórios Financeiros" description="Relatórios detalhados de performance financeira e análises." />,
  
  // Clientes
  "customer-list": CustomersSection,
  leads: () => <PlaceholderSection title="Leads" description="Gerenciamento de prospects e potenciais clientes." />,
  "sales-funnel": () => <PlaceholderSection title="Funil de Vendas" description="Visualização e otimização do processo de vendas." />,
  "customer-segments": () => <PlaceholderSection title="Segmentação" description="Análise e segmentação inteligente da base de clientes." />,
  
  // Suporte
  tickets: SupportSection,
  "chat-history": () => <PlaceholderSection title="Histórico de Chat" description="Histórico completo de conversas e atendimentos realizados." />,
  "support-analytics": () => <PlaceholderSection title="Analytics SAC" description="Métricas e análises do atendimento ao cliente." />,
  
  // Marketing
  campaigns: MarketingSection,
  "email-marketing": () => <PlaceholderSection title="E-mail Marketing" description="Criação e gerenciamento de campanhas de e-mail marketing." />,
  notifications: () => <PlaceholderSection title="Notificações" description="Sistema de notificações automáticas para clientes e equipe." />,
  coupons: () => <PlaceholderSection title="Cupons" description="Criação e gerenciamento de cupons de desconto e promoções." />,
  
  // Produtos
  products: ProductsSection,
  
  // Analytics
  analytics: AnalyticsSection,
  "sales-analytics": () => <PlaceholderSection title="Analytics de Vendas" description="Análises profundas do desempenho de vendas e conversões." />,
  "customer-analytics": () => <PlaceholderSection title="Analytics de Clientes" description="Comportamento e padrões de consumo dos clientes." />,
  "product-analytics": () => <PlaceholderSection title="Analytics de Produtos" description="Performance e popularidade dos produtos no catálogo." />,
  "marketing-analytics": () => <PlaceholderSection title="Analytics de Marketing" description="ROI e efetividade das campanhas de marketing." />,
  
  // Configurações
  settings: SettingsSection,
  "company-settings": () => <PlaceholderSection title="Configurações da Empresa" description="Informações gerais, dados fiscais e configurações básicas." />,
  "user-permissions": () => <PlaceholderSection title="Permissões de Usuário" description="Controle de acesso e permissões por usuário ou grupo." />,
  integrations: () => <PlaceholderSection title="Integrações" description="Conecte com sistemas externos como ERPs, CRMs e APIs." />,
  "payment-gateways": () => <PlaceholderSection title="Gateways de Pagamento" description="Configuração de meios de pagamento e gateways." />,
};
