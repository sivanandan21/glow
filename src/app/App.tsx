import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomeSection } from "./components/HomeSection";
import { ScanSection } from "./components/ScanSection";
import { TipsSection } from "./components/TipsSection";
import { ProductsSection } from "./components/ProductsSection";
import { ContactSection } from "./components/ContactSection";
import { AuthModal } from "./components/AuthModal";
import { Toaster } from "./components/ui/sonner";

interface ScanResult {
  skinType: string;
  concerns: string[];
  hydrationLevel: number;
  texture: string;
  recommendations: string[];
}

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    // Check for logged-in user
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setUser({ email: loggedInUser });
    }

    // Scroll to top on section change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  const handleLogin = (email: string) => {
    setUser({ email });
    localStorage.setItem("currentUser", email);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setCurrentSection("tips");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <HomeSection onNavigate={setCurrentSection} />;
      case "scan":
        return <ScanSection onScanComplete={handleScanComplete} user={user} />;
      case "tips":
        return <TipsSection scanResult={scanResult} />;
      case "products":
        return <ProductsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <main>{renderSection()}</main>

      <footer className="bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] border-t border-[#d4af37]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-2">
            © 2024 GlowScan. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Experience the future of personalized skincare
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;