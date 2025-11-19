import React, { useState } from 'react';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import AIStylist from './components/AIStylist';
import { ShoppingBag, Search, Menu, X, Diamond } from 'lucide-react';

// Mock Inventory Data (20 AED - 500 AED)
const INVENTORY: Product[] = [
  {
    id: 1,
    name: "Minimalist Silver Studs",
    category: "Earrings",
    price: 25,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    description: "Simple, elegant sterling silver studs perfect for daily wear."
  },
  {
    id: 2,
    name: "Rose Gold Plated Chain",
    category: "Necklaces",
    price: 45,
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600",
    description: "Delicate rose gold plated chain with a high-polish finish."
  },
  {
    id: 3,
    name: "Bohemian Turquoise Ring",
    category: "Rings",
    price: 85,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    description: "Vintage-inspired ring featuring a synthetic turquoise stone."
  },
  {
    id: 4,
    name: "Freshwater Pearl Bracelet",
    category: "Bracelets",
    price: 120,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    description: "Classic cultured freshwater pearls strung on silk thread."
  },
  {
    id: 5,
    name: "Crystal Drop Earrings",
    category: "Earrings",
    price: 180,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=600",
    description: "Statement earrings with cascading cubic zirconia crystals."
  },
  {
    id: 6,
    name: "Sapphire Blue Pendant",
    category: "Necklaces",
    price: 250,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
    description: "Deep blue lab-created sapphire set in sterling silver halo."
  },
  {
    id: 7,
    name: "Emerald Cut Cocktail Ring",
    category: "Rings",
    price: 350,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
    description: "Large emerald-cut green stone ring for evening elegance."
  },
  {
    id: 8,
    name: "Gold Vermeil Cuff",
    category: "Bracelets",
    price: 480,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=600",
    description: "Solid structured cuff bracelet, 18k gold vermeil styling."
  },
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredProducts = categoryFilter === 'All' 
    ? INVENTORY 
    : INVENTORY.filter(p => p.category === categoryFilter);

  const categories = ['All', ...Array.from(new Set(INVENTORY.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-stone-100 rounded-full lg:hidden">
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                 <Diamond className="text-amber-600 fill-amber-600" size={24} />
                 <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">Lumina</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600 uppercase tracking-wider">
              <a href="#" className="hover:text-stone-900 transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Necklaces</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Earrings</a>
              <a href="#" className="text-amber-600">Sale</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-amber-600 transition-colors"><Search size={20} /></button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-amber-600 transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-stone-900 h-[500px] flex items-center justify-center text-center px-4">
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Jewelry" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-4xl">
          <p className="text-amber-400 uppercase tracking-[0.2em] text-sm font-bold mb-4">Handcrafted Elegance</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
            Define Your Moment
          </h1>
          <p className="text-stone-300 text-lg mb-8 max-w-xl mx-auto">
            Discover our curated collection of affordable luxury. Timeless pieces starting from just 20 AED.
          </p>
          <button className="bg-white text-stone-900 px-8 py-3 font-medium text-sm uppercase tracking-wider hover:bg-amber-50 transition-colors">
            Shop The Collection
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${categoryFilter === cat 
                  ? 'bg-stone-900 text-white shadow-lg' 
                  : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {/* AI Stylist Section */}
        <AIStylist products={INVENTORY} />

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-white text-xl mb-4">Lumina</h3>
            <p className="text-sm">Elevating everyday style with affordable luxury.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Newsletter</h4>
             <div className="flex">
               <input type="email" placeholder="Enter your email" className="bg-white/10 border-none text-white px-4 py-2 w-full focus:ring-1 focus:ring-amber-500" />
               <button className="bg-amber-600 text-white px-4">Join</button>
             </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer / Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-stone-900">Shopping Bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-stone-500 py-12">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your bag is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-amber-600 font-medium hover:underline">Start Shopping</button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-stone-100" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-stone-900">{item.name}</h3>
                        <p className="font-medium">{item.price * item.quantity} AED</p>
                      </div>
                      <p className="text-sm text-stone-500 mb-2">{item.category}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-stone-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <div className="flex justify-between mb-4 text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{cartTotal} AED</span>
                </div>
                <div className="flex justify-between mb-6 text-stone-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between mb-6 text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>{cartTotal} AED</span>
                </div>
                <button className="w-full bg-stone-900 text-white py-4 font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;