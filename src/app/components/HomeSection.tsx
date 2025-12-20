import { Sparkles, Camera, Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const features = [
    {
      icon: Camera,
      title: "AI Skin Analysis",
      description: "Upload or scan your face for instant personalized analysis",
      color: "text-pink-400",
    },
    {
      icon: Heart,
      title: "Personalized Tips",
      description: "Get custom skincare routines and lifestyle recommendations",
      color: "text-purple-400",
    },
    {
      icon: ShoppingBag,
      title: "Curated Products",
      description: "Discover beauty products tailored to your skin type",
      color: "text-rose-400",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#1a1a1a] to-black"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-[#d4af37] mx-auto" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
            Unlock Your Natural Glow
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of skincare with AI-powered analysis. Get personalized beauty tips
            and discover products perfect for your unique skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("scan")}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black px-8 py-6 hover:opacity-90"
            >
              Start Your Scan
            </Button>
            <Button
              onClick={() => onNavigate("products")}
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-8 py-6"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-center mb-12 bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
            How GlowScan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all"
              >
                <feature.icon className={`w-12 h-12 text-[#d4af37] mb-4`} />
                <h3 className="text-xl mb-3 text-[#d4af37]">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1a1a] via-black to-[#1a1a1a] border-t border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl mb-6 bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
            Ready to Transform Your Skincare Routine?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users who have discovered their perfect skincare match with GlowScan.
          </p>
          <Button
            onClick={() => onNavigate("scan")}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black px-8 py-6 hover:opacity-90"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}