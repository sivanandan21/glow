import { useState } from "react";
import { ShoppingCart, Star, Filter } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  skinType: string[];
  description: string;
}

export function ProductsSection() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [skinTypeFilter, setSkinTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Hydrating Serum",
      brand: "GlowLux",
      price: 45,
      image: "https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc2NjE1MjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      category: "serum",
      skinType: ["dry", "normal", "combination"],
      description: "Intensive hydration with hyaluronic acid for plump, dewy skin",
    },
    {
      id: 2,
      name: "Rich Moisturizer",
      brand: "Derma Essence",
      price: 38,
      image: "https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbW9pc3R1cml6ZXIlMjBjcmVhbXxlbnwxfHx8fDE3NjYxNjEwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      category: "moisturizer",
      skinType: ["dry", "sensitive"],
      description: "Nourishing cream with ceramides for lasting comfort",
    },
    {
      id: 3,
      name: "Daily Sunscreen SPF 50",
      brand: "SunGuard",
      price: 32,
      image: "https://images.unsplash.com/photo-1737007516314-27508948ab4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBiZWF1dHl8ZW58MXx8fHwxNzY2MjI2NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      category: "sunscreen",
      skinType: ["oily", "normal", "combination", "dry", "sensitive"],
      description: "Lightweight, non-greasy protection against UV damage",
    },
    {
      id: 4,
      name: "Gentle Foam Cleanser",
      brand: "PureClean",
      price: 28,
      image: "https://images.unsplash.com/photo-1763622499218-37fdfc7a590a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNpbmclMjBmb2FtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjYyMjY0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      category: "cleanser",
      skinType: ["sensitive", "dry", "normal"],
      description: "pH-balanced formula that cleanses without stripping",
    },
    {
      id: 5,
      name: "Purifying Clay Mask",
      brand: "ClayWorks",
      price: 35,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NjYxNzE3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      category: "mask",
      skinType: ["oily", "combination"],
      description: "Deep cleansing mask to minimize pores and control oil",
    },
    {
      id: 6,
      name: "Anti-Aging Eye Cream",
      brand: "Youth Restore",
      price: 52,
      image: "https://images.unsplash.com/photo-1629732047356-30c7e14e712b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBjcmVhbSUyMHNraW5jYXJlfGVufDF8fHx8MTc2NjIyNjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      category: "eye-cream",
      skinType: ["normal", "dry", "combination"],
      description: "Targets fine lines and dark circles for brighter eyes",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
    if (skinTypeFilter !== "all" && !product.skinType.includes(skinTypeFilter)) return false;
    if (priceFilter === "under30" && product.price >= 30) return false;
    if (priceFilter === "30to50" && (product.price < 30 || product.price > 50)) return false;
    if (priceFilter === "over50" && product.price <= 50) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#1a1a1a] to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
            Curated Beauty Products
          </h1>
          <p className="text-gray-300">
            Discover premium skincare products handpicked by our experts
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-[#1a1a1a] border border-[#d4af37]/20">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-[#d4af37]">Filter Products</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="cleanser">Cleanser</SelectItem>
                    <SelectItem value="serum">Serum</SelectItem>
                    <SelectItem value="moisturizer">Moisturizer</SelectItem>
                    <SelectItem value="sunscreen">Sunscreen</SelectItem>
                    <SelectItem value="mask">Mask</SelectItem>
                    <SelectItem value="eye-cream">Eye Cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Skin Type</label>
                <Select value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Skin Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skin Types</SelectItem>
                    <SelectItem value="oily">Oily</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="sensitive">Sensitive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Price Range</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under30">Under $30</SelectItem>
                    <SelectItem value="30to50">$30 - $50</SelectItem>
                    <SelectItem value="over50">Over $50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all h-full flex flex-col">
                <div className="aspect-square overflow-hidden bg-black/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#d4af37] text-[#d4af37]"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-1">{product.rating}</span>
                  </div>
                  <h3 className="text-lg mb-1 text-[#d4af37]">{product.name}</h3>
                  <p className="text-sm text-[#b8860b] mb-3">{product.brand}</p>
                  <p className="text-sm text-gray-400 mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl text-[#d4af37]">${product.price}</span>
                    <Button className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black hover:opacity-90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}