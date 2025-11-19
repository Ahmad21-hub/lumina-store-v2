import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-lg text-stone-900 mb-2 group-hover:text-amber-700 transition-colors truncate">{product.name}</h3>
        <div className="flex justify-between items-end">
          <p className="text-stone-900 font-medium">{product.price} AED</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;