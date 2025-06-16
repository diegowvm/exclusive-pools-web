
import { AdminDashboard } from "./sections/AdminDashboard";
import { DesignOverview } from "./sections/design/DesignOverview";
import { DesignLayout } from "./sections/design/DesignLayout";
import { DesignColors } from "./sections/design/DesignColors";
import { DesignTypography } from "./sections/design/DesignTypography";
import { DesignImages } from "./sections/design/DesignImages";
import { DesignContent } from "./sections/design/DesignContent";
import { DesignResponsive } from "./sections/design/DesignResponsive";
import { ProductsManagement } from "./sections/ProductsManagement";
import { OrdersSection } from "./sections/OrdersSection";
import { CustomersSection } from "./sections/CustomersSection";
import { FinancialSection } from "./sections/FinancialSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { SettingsSection } from "./sections/SettingsSection";
import { cn } from "@/lib/utils";

interface AdminContentProps {
  activeSection: string;
  sidebarCollapsed: boolean;
}

export function AdminContent({ activeSection, sidebarCollapsed }: AdminContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      
      // Design sections
      case "design-overview":
        return <DesignOverview />;
      case "design-layout":
        return <DesignLayout />;
      case "design-colors":
        return <DesignColors />;
      case "design-typography":
        return <DesignTypography />;
      case "design-images":
        return <DesignImages />;
      case "design-content":
        return <DesignContent />;
      case "design-responsive":
        return <DesignResponsive />;
      
      // Products sections
      case "products":
      case "products-overview":
      case "products-catalog":
      case "products-categories":
      case "products-add":
        return <ProductsManagement />;
      
      // Business sections
      case "orders":
      case "quotes":
      case "sales-funnel":
      case "leads":
        return <OrdersSection />;
      case "customers":
      case "customer-list":
      case "customer-segments":
        return <CustomersSection />;
      case "financial":
      case "revenue":
      case "expenses":
      case "reports":
      case "invoices":
        return <FinancialSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "settings":
        return <SettingsSection />;
      
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <main className={cn(
      "flex-1 overflow-auto transition-all duration-300 bg-gradient-to-br from-slate-100 to-slate-200"
    )}>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {renderSection()}
      </div>
    </main>
  );
}
