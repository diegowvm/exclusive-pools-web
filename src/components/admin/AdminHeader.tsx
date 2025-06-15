
import { Button } from "@/components/ui/button";
import { Bell, Sun, Moon, UserCircle2 } from "lucide-react";

export function AdminHeader({ onLogout, onToggleTheme }: { onLogout: () => void; onToggleTheme?: () => void; }) {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-2 bg-white/80 dark:bg-slate-900/90 border-b shadow-soft sticky top-0 z-40">
      <h2 className="font-bold text-xl text-premium-black dark:text-white tracking-tight">Painel Administrativo</h2>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notificações"><Bell className="w-5 h-5" /></Button>
        <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Alternar tema">
          <span className="sr-only">Alternar tema</span>
          <Sun className="w-5 h-5 block dark:hidden" />
          <Moon className="w-5 h-5 hidden dark:block" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Usuário"><UserCircle2 className="w-7 h-7" /></Button>
        <Button variant="outline" className="text-xs px-3" onClick={onLogout}>Sair</Button>
      </div>
    </header>
  );
}
