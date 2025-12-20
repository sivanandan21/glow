import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Card } from "./ui/card";

interface ScanResult {
  skinType: string;
  concerns: string[];
  hydrationLevel: number;
  texture: string;
  recommendations: string[];
}

interface ScanSectionProps {
  onScanComplete: (result: ScanResult) => void;
  user: { email: string } | null;
}

export function ScanSection({ onScanComplete, user }: ScanSectionProps) {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setUseCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please upload an image instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        setImage(imageData);
        
        // Stop camera
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        setUseCamera(false);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = async () => {
    setScanning(true);
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Generate mock analysis results
    const skinTypes = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];
    const concerns = [
      ["Fine Lines", "Wrinkles"],
      ["Acne", "Blemishes"],
      ["Dark Spots", "Hyperpigmentation"],
      ["Dryness", "Dehydration"],
      ["Enlarged Pores", "Texture"],
    ];
    
    const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
    const randomConcerns = concerns[Math.floor(Math.random() * concerns.length)];
    const hydration = Math.floor(Math.random() * 40) + 40;
    
    const result: ScanResult = {
      skinType: randomSkinType,
      concerns: randomConcerns,
      hydrationLevel: hydration,
      texture: hydration > 60 ? "Smooth" : "Slightly Rough",
      recommendations: [
        `Use a ${randomSkinType.toLowerCase()}-specific cleanser twice daily`,
        "Apply SPF 30+ sunscreen every morning",
        `Target ${randomConcerns[0].toLowerCase()} with specialized serum`,
        "Moisturize regularly to maintain hydration",
        "Stay hydrated and get 7-8 hours of sleep",
      ],
    };
    
    setScanResult(result);
    setScanning(false);
    setShowResult(true);
    onScanComplete(result);
    
    // Save to history if user is logged in
    if (user) {
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      history.unshift({
        date: new Date().toISOString(),
        result,
        email: user.email,
      });
      localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 10)));
    }
  };

  const resetScan = () => {
    setImage(null);
    setShowResult(false);
    setScanResult(null);
    if (useCamera && videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
      setUseCamera(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#1a1a1a] to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
            Scan Your Skin
          </h1>
          <p className="text-gray-300">
            Upload a photo or use your camera for instant AI-powered skin analysis
          </p>
        </motion.div>

        {!image && !useCamera && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <Card className="p-8 text-center bg-[#1a1a1a] border-2 border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-colors cursor-pointer" onClick={startCamera}>
              <Camera className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-xl mb-2 text-[#d4af37]">Use Camera</h3>
              <p className="text-gray-400 mb-4">
                Take a photo with your device camera
              </p>
              <Button className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black w-full">
                Open Camera
              </Button>
            </Card>

            <Card className="p-8 text-center bg-[#1a1a1a] border-2 border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-xl mb-2 text-[#d4af37]">Upload Photo</h3>
              <p className="text-gray-400 mb-4">
                Choose an existing photo from your device
              </p>
              <Button className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black w-full">
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </Card>
          </motion.div>
        )}

        {useCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Card className="p-4 mb-4 bg-[#1a1a1a] border border-[#d4af37]/20">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </Card>
            <div className="flex gap-4 justify-center">
              <Button onClick={capturePhoto} className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black">
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
              <Button onClick={resetScan} variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {image && !showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Card className="p-4 mb-6 bg-[#1a1a1a] border border-[#d4af37]/20">
              <img
                src={image}
                alt="Captured"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </Card>
            <div className="flex gap-4 justify-center">
              {scanning ? (
                <Button disabled className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </Button>
              ) : (
                <>
                  <Button onClick={analyzeSkin} className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Skin
                  </Button>
                  <Button onClick={resetScan} variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
                    Retake
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {showResult && scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 mb-6 bg-[#1a1a1a] border border-[#d4af37]/20">
              <h2 className="text-2xl mb-6 text-center bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
                Your Skin Analysis Results
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-black/40 p-6 rounded-xl border border-[#d4af37]/20">
                  <h3 className="mb-2 text-[#d4af37]">Skin Type</h3>
                  <p className="text-2xl text-gray-200">{scanResult.skinType}</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-[#d4af37]/20">
                  <h3 className="mb-2 text-[#d4af37]">Hydration Level</h3>
                  <p className="text-2xl text-gray-200">{scanResult.hydrationLevel}%</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-[#d4af37]/20">
                  <h3 className="mb-2 text-[#d4af37]">Texture</h3>
                  <p className="text-2xl text-gray-200">{scanResult.texture}</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-[#d4af37]/20">
                  <h3 className="mb-2 text-[#d4af37]">Main Concerns</h3>
                  <p className="text-gray-200">{scanResult.concerns.join(", ")}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl mb-4 text-[#d4af37]">Personalized Recommendations</h3>
                <ul className="space-y-3">
                  {scanResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-[#d4af37]/20">
                      <Sparkles className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetScan} className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black">
                New Scan
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}