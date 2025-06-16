
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Search, 
  Globe,
  Activity,
  Users,
  TrendingUp,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onToggleTheme?: () => void;
}

export function AdminHeader({ 
  onLogout, 
  onToggleSidebar, 
  sidebarCollapsed,
  onToggleTheme 
}: AdminHeaderProps) {
  const openSite = () => {
    window.open('/', '_blank');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Center Section - Quick Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Card className="px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Sistema Online</span>
              </div>
            </Card>

            <Card className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">42 Usuários</span>
              </div>
            </Card>

            <Card className="px-3 py-2 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">+15% Vendas</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={openSite}
            className="gap-2 text-sm"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Ver Site</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
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
          >
            <Sun className="h-5 w-5 block dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                AD
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Admin</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Administrador</p>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={onLogout}
              className="text-xs"
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
