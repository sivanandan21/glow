import { Sparkles, Sun, Droplets, Moon, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "./ui/card";

interface ScanResult {
  skinType: string;
  concerns: string[];
  hydrationLevel: number;
  texture: string;
  recommendations: string[];
}

interface TipsSectionProps {
  scanResult: ScanResult | null;
}

export function TipsSection({ scanResult }: TipsSectionProps) {
  const generalTips = [
    {
      icon: Sun,
      title: "Morning Routine",
      tips: [
        "Cleanse with a gentle, pH-balanced cleanser",
        "Apply vitamin C serum for brightness",
        "Use lightweight moisturizer",
        "Always apply SPF 30+ sunscreen",
      ],
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: Moon,
      title: "Evening Routine",
      tips: [
        "Double cleanse to remove makeup and sunscreen",
        "Use retinol or treatment serum",
        "Apply rich night cream",
        "Don't forget your neck and décolleté",
      ],
      color: "from-indigo-400 to-purple-400",
    },
    {
      icon: Droplets,
      title: "Hydration Tips",
      tips: [
        "Drink at least 8 glasses of water daily",
        "Use a humidifier in dry environments",
        "Apply hyaluronic acid serum",
        "Mist throughout the day",
      ],
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Heart,
      title: "Lifestyle Habits",
      tips: [
        "Get 7-8 hours of quality sleep",
        "Eat antioxidant-rich foods",
        "Manage stress with meditation",
        "Exercise regularly for circulation",
      ],
      color: "from-pink-400 to-rose-400",
    },
  ];

  const getSkinTypeSpecificTips = (skinType: string) => {
    const tips: Record<string, string[]> = {
      Oily: [
        "Use oil-free, non-comedogenic products",
        "Try clay masks 2-3 times per week",
        "Avoid heavy, greasy moisturizers",
        "Use salicylic acid for pore control",
      ],
      Dry: [
        "Use cream-based cleansers",
        "Layer hydrating products",
        "Apply facial oil at night",
        "Avoid hot water when cleansing",
      ],
      Combination: [
        "Use different products for different zones",
        "Balance with lightweight gel moisturizer",
        "Spot-treat oily areas with BHA",
        "Hydrate dry areas with extra moisture",
      ],
      Normal: [
        "Maintain with balanced routine",
        "Focus on prevention and protection",
        "Use gentle, effective products",
        "Adapt routine to seasonal changes",
      ],
      Sensitive: [
        "Choose fragrance-free products",
        "Patch test all new products",
        "Avoid harsh exfoliants",
        "Use soothing ingredients like centella",
      ],
    };
    return tips[skinType] || tips.Normal;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#1a1a1a] to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
            Beauty Tips & Advice
          </h1>
          <p className="text-gray-300">
            {scanResult
              ? "Personalized tips based on your skin analysis"
              : "Expert skincare tips for glowing, healthy skin"}
          </p>
        </motion.div>

        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="p-8 bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/30">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#d4af37]" />
                <h2 className="text-2xl text-[#d4af37]">
                  Tips for {scanResult.skinType} Skin
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {getSkinTypeSpecificTips(scanResult.skinType).map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-black/40 rounded-lg border border-[#d4af37]/20"
                  >
                    <Sparkles className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {generalTips.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl text-[#d4af37]">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <span className="text-[#d4af37] mt-1">•</span>
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] border border-[#d4af37]/20">
            <h2 className="text-2xl mb-4 text-center bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
              Pro Tips for Best Results
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🌟</div>
                <h4 className="mb-2 text-[#d4af37]">Be Consistent</h4>
                <p className="text-sm text-gray-400">
                  Stick to your routine for at least 6-8 weeks to see results
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📝</div>
                <h4 className="mb-2 text-[#d4af37]">Track Progress</h4>
                <p className="text-sm text-gray-400">
                  Take photos weekly to monitor your skin's improvement
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💧</div>
                <h4 className="mb-2 text-[#d4af37]">Stay Hydrated</h4>
                <p className="text-sm text-gray-400">
                  Beautiful skin starts from within with proper hydration
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}