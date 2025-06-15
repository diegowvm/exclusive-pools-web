
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, Image, Images, Palette } from "lucide-react";
import { DesignState } from "@/contexts/DesignContext";

interface DesignStatusCardsProps {
  designState: DesignState;
}

export function DesignStatusCards({ designState }: DesignStatusCardsProps) {
  const designStats = [
    { 
      label: "Layout", 
      value: designState.layout || "Não definido", 
      icon: Layout, 
      color: "text-blue-600",
      status: designState.layout ? "active" : "inactive"
    },
    { 
      label: "Logo", 
      value: designState.logo ? "Configurado" : "Padrão", 
      icon: Image, 
      color: "text-green-600",
      status: designState.logo !== '/lovable-uploads/placeholder-logo.png' ? "active" : "inactive"
    },
    { 
      label: "Slides", 
      value: designState.carousel?.length || 0, 
      icon: Images, 
      color: "text-purple-600",
      status: designState.carousel?.length > 0 ? "active" : "inactive"
    },
    { 
      label: "Tema", 
      value: "Personalizado", 
      icon: Palette, 
      color: "text-orange-600",
      status: "active"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {designStats.map((stat) => (
        <Card key={stat.label} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {stat.value}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <Badge 
                    variant={stat.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
