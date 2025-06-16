
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Search, 
  Eye,
  Activity,
  Users,
  TrendingUp,
  Shield
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUserRole, UserRole } from "@/contexts/UserRoleContext";

interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onToggleTheme?: () => void;
}

const roleLabels = {
  admin: "Administrador",
  financeiro: "Financeiro", 
  vendedor: "Vendedor"
};

const roleColors = {
  admin: "from-red-500 to-pink-500",
  financeiro: "from-green-500 to-emerald-500",
  vendedor: "from-blue-500 to-cyan-500"
};

export function AdminHeader({ 
  onLogout, 
  onToggleSidebar, 
  sidebarCollapsed,
  onToggleTheme 
}: AdminHeaderProps) {
  const { userRole, setUserRole } = useUserRole();

  const openSite = () => {
    window.open('/', '_blank');
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden text-slate-300 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 w-64 bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Center Section - Role Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-slate-400" />
            <Select value={userRole} onValueChange={(value: UserRole) => setUserRole(value)}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <SelectItem key={role} value={role} className="text-slate-100 focus:bg-slate-700">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4">
            <Card className="px-3 py-2 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700/50">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Sistema Online</span>
              </div>
            </Card>

            <Card className="px-3 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">42 Usuários</span>
              </div>
            </Card>

            <Card className="px-3 py-2 bg-gradient-to-r from-purple-900/30 to-violet-900/30 border-purple-700/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">+15% Vendas</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={openSite}
            className="gap-2 text-sm border-slate-600 text-slate-300 hover:text-white"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Ver Site</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-slate-300 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-600">
              3
            </Badge>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleTheme}
            className="text-slate-300 hover:text-white"
          >
            <Sun className="h-5 w-5 block dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-600">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className={`bg-gradient-to-r ${roleColors[userRole]} text-white text-sm`}>
                {userRole === 'admin' ? 'AD' : userRole === 'financeiro' ? 'FN' : 'VD'}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-100">{roleLabels[userRole]}</p>
              <p className="text-xs text-slate-400">Sistema Empresarial</p>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={onLogout}
              className="text-xs border-slate-600 text-slate-300 hover:text-white"
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
