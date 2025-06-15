import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PiscinasPage from "./pages/PiscinasPage";
import BanheirasPage from "./pages/BanheirasPage";
import SpasPage from "./pages/SpasPage";
import EquipamentosPage from "./pages/EquipamentosPage";
import OrcamentoPage from "./pages/OrcamentoPage";
import AdminPanel from "./pages/admim";
import { CartProvider } from "./contexts/CartContext";
import AuthConfirmPage from "./pages/AuthConfirmPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/piscinas" element={<PiscinasPage />} />
            <Route path="/banheiras" element={<BanheirasPage />} />
            <Route path="/spas" element={<SpasPage />} />
            <Route path="/equipamentos" element={<EquipamentosPage />} />
            <Route path="/orcamento" element={<OrcamentoPage />} />
            <Route path="/adminpiscinas" element={<AdminPanel />} />
            <Route path="/auth/confirm" element={<AuthConfirmPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
