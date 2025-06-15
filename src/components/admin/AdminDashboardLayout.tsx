
import { CRMLayout } from "./crm/CRMLayout";

export function AdminDashboardLayout({ onLogout }: { onLogout: () => void }) {
  return <CRMLayout onLogout={onLogout} />;
}
