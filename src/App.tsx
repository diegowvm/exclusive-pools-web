
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import PiscinasPage from "./pages/PiscinasPage";
import SpasPage from "./pages/SpasPage";
import BanheirasPage from "./pages/BanheirasPage";
import EquipamentosPage from "./pages/EquipamentosPage";
import OrcamentoPage from "./pages/OrcamentoPage";
import AdminPanel from "./pages/admin";
import { Toaster } from "@/components/ui/toaster";
import { DesignProvider } from "@/contexts/DesignContext";

function App() {
  return (
    <DesignProvider>
      <Router>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/piscinas" element={<PiscinasPage />} />
                <Route path="/spas" element={<SpasPage />} />
                <Route path="/banheiras" element={<BanheirasPage />} />
                <Route path="/equipamentos" element={<EquipamentosPage />} />
                <Route path="/orcamento" element={<OrcamentoPage />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </CartProvider>
      </Router>
    </DesignProvider>
  );
}

export default App;
