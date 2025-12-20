import { Sparkles, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  user: { email: string } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export function Header({ currentSection, onNavigate, user, onLogout, onOpenAuth }: HeaderProps) {
  const sections = [
    { id: "home", label: "Home" },
    { id: "scan", label: "Scan" },
    { id: "tips", label: "Beauty Tips" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-[#d4af37]/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
            <span className="text-xl font-semibold bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
              GlowScan
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentSection === section.id
                    ? "bg-[#d4af37]/10 text-[#d4af37]"
                    : "text-gray-300 hover:bg-[#d4af37]/5 hover:text-[#d4af37]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                  <User className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm text-[#d4af37]">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onOpenAuth}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black hover:opacity-90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                currentSection === section.id
                  ? "bg-[#d4af37]/10 text-[#d4af37]"
                  : "text-gray-300 hover:bg-[#d4af37]/5 hover:text-[#d4af37]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}