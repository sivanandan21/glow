import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      
      // Mock signup - save user to localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find((u: any) => u.email === formData.email)) {
        toast.error("Email already exists");
        return;
      }
      
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Account created successfully!");
      onLogin(formData.email);
    } else {
      // Mock login - check localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        toast.success("Welcome back!");
        onLogin(formData.email);
      } else {
        toast.error("Invalid email or password");
        return;
      }
    }

    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1a1a] border border-[#d4af37]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div>
              <label className="block mb-2 text-sm text-gray-300">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="pl-10 border-[#d4af37]/20 focus:border-[#d4af37] bg-black/40 text-gray-200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="pl-10 border-[#d4af37]/20 focus:border-[#d4af37] bg-black/40 text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="pl-10 border-[#d4af37]/20 focus:border-[#d4af37] bg-black/40 text-gray-200"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="pl-10 border-[#d4af37]/20 focus:border-[#d4af37] bg-black/40 text-gray-200"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black hover:opacity-90"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-[#d4af37] hover:text-[#ffd700]"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}