
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Layout, Palette, Image, Images } from "lucide-react";

export function DesignTabNavigation() {
  return (
    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
      <TabsTrigger value="overview" className="gap-2 py-3">
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">Visão Geral</span>
      </TabsTrigger>
      <TabsTrigger value="layout" className="gap-2 py-3">
        <Layout className="w-4 h-4" />
        <span className="hidden sm:inline">Layout</span>
      </TabsTrigger>
      <TabsTrigger value="colors" className="gap-2 py-3">
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Cores</span>
      </TabsTrigger>
      <TabsTrigger value="logo" className="gap-2 py-3">
        <Image className="w-4 h-4" />
        <span className="hidden sm:inline">Logo</span>
      </TabsTrigger>
      <TabsTrigger value="carousel" className="gap-2 py-3">
        <Images className="w-4 h-4" />
        <span className="hidden sm:inline">Carrossel</span>
      </TabsTrigger>
    </TabsList>
  );
}
