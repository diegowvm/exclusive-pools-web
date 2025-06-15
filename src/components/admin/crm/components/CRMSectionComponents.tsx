
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

export const sectionComponents = {
  dashboard: CRMDashboard,
  // Design do Site
  "design-site": DesignSiteSection,
  "design-layout": () => <div className="p-6"><DesignSection /></div>,
  "design-logo": () => <div className="p-6"><DesignSection /></div>,
  "design-colors": () => <div className="p-6"><DesignSection /></div>,
  "design-carousel": () => <div className="p-6"><DesignSection /></div>,
  "design-content": () => <div className="p-6 bg-white rounded-xl shadow-soft"><div className="mb-6"><h3 className="text-lg font-bold mb-4">Edição de Conteúdo e Textos</h3><p className="text-gray-600">Configure todos os textos, títulos, descrições e conteúdo das páginas do site.</p></div></div>,
  "design-catalogs": () => <div className="p-6"><CatalogSection activeCatalog="catalog-piscinas" /></div>,
  "catalog-piscinas": () => <div className="p-6"><CatalogSection activeCatalog="catalog-piscinas" /></div>,
  "catalog-banheiras": () => <div className="p-6"><CatalogSection activeCatalog="catalog-banheiras" /></div>,
  "catalog-spa": () => <div className="p-6"><CatalogSection activeCatalog="catalog-spa" /></div>,
  "catalog-equipamentos": () => <div className="p-6"><CatalogSection activeCatalog="catalog-equipamentos" /></div>,
  // Sales
  orders: OrdersSection,
  quotes: () => <div>Orçamentos em desenvolvimento</div>,
  "payment-status": () => <div>Status de Pagamento em desenvolvimento</div>,
  shipping: () => <div>Entregas em desenvolvimento</div>,
  // Financial
  revenue: FinancialSection,
  expenses: () => <div>Despesas em desenvolvimento</div>,
  invoices: () => <div>Notas Fiscais em desenvolvimento</div>,
  reports: () => <div>Relatórios Financeiros em desenvolvimento</div>,
  // Customers
  "customer-list": CustomersSection,
  leads: () => <div>Leads em desenvolvimento</div>,
  "sales-funnel": () => <div>Funil de Vendas em desenvolvimento</div>,
  "customer-segments": () => <div>Segmentação em desenvolvimento</div>,
  // Support
  tickets: SupportSection,
  "chat-history": () => <div>Histórico de Chat em desenvolvimento</div>,
  "support-analytics": () => <div>Analytics SAC em desenvolvimento</div>,
  // Marketing
  campaigns: MarketingSection,
  "email-marketing": () => <div>E-mail Marketing em desenvolvimento</div>,
  notifications: () => <div>Notificações em desenvolvimento</div>,
  coupons: () => <div>Cupons em desenvolvimento</div>,
  // Products
  products: ProductsSection,
  // Analytics
  analytics: AnalyticsSection,
  "sales-analytics": () => <div>Analytics de Vendas em desenvolvimento</div>,
  "customer-analytics": () => <div>Analytics de Clientes em desenvolvimento</div>,
  "product-analytics": () => <div>Analytics de Produtos em desenvolvimento</div>,
  "marketing-analytics": () => <div>Analytics de Marketing em desenvolvimento</div>,
  // Settings
  settings: SettingsSection,
  "company-settings": () => <div>Configurações da Empresa em desenvolvimento</div>,
  "user-permissions": () => <div>Permissões de Usuário em desenvolvimento</div>,
  integrations: () => <div>Integrações em desenvolvimento</div>,
  "payment-gateways": () => <div>Gateways de Pagamento em desenvolvimento</div>,
};
