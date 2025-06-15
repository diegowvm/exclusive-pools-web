import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { Toaster } from "@/components/ui/toaster";
import { DesignProvider } from "@/contexts/DesignContext";

function App() {
  return (
    <DesignProvider>
      <Router>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
            <Toaster />
          </div>
        </CartProvider>
      </Router>
    </DesignProvider>
  );
}

export default App;
