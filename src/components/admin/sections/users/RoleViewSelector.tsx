
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useToast } from "@/hooks/use-toast";
import { roleLabels } from "./types";

export function RoleViewSelector() {
  const { userRole, setUserRole, hasPermission } = useUserRole();
  const { toast } = useToast();

  const switchToUserRole = (role: string) => {
    setUserRole(role as any);
    toast({
      title: "Visualização alterada",
      description: `Agora visualizando como: ${roleLabels[role as keyof typeof roleLabels]?.label}`,
    });
  };

  if (!hasPermission('all')) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Label>Visualizar como:</Label>
      <Select value={userRole} onValueChange={switchToUserRole}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="financeiro">Financeiro</SelectItem>
          <SelectItem value="vendedor">Vendedor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
