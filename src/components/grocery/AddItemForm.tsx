
import React, { useState } from 'react';
import { Plus, X, Scan, Carrot, Milk, ShoppingBag, Coffee, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GroceryCategory } from './GroceryItem';

interface AddItemFormProps {
  onAdd: (name: string, category: GroceryCategory, quantity: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GroceryCategory>('other');
  const [quantity, setQuantity] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), category, quantity);
      setName('');
      setCategory('other');
      setQuantity(1);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="mb-6">
      {isFormOpen ? (
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-scale-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Add new item</h3>
            <button 
              onClick={() => setIsFormOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/5 text-white/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="item-name" className="block text-sm text-white/70 mb-1">
                  Item name
                </label>
                <div className="relative">
                  <input
                    id="item-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter item name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-kartify-purple/50"
                    autoFocus
                  />
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                    aria-label="Scan barcode"
                  >
                    <Scan className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="item-category" className="block text-sm text-white/70 mb-1">
                    Category
                  </label>
                  <select
                    id="item-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GroceryCategory)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-kartify-purple/50"
                  >
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="pantry">Pantry</option>
                    <option value="beverages">Beverages</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="item-quantity" className="block text-sm text-white/70 mb-1">
                    Quantity
                  </label>
                  <input
                    id="item-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-kartify-purple/50"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-kartify-purple text-white hover:bg-opacity-90 transition-glow hover:shadow-neon-purple"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all group focus-ring animate-fade-in"
        >
          <Plus className="h-5 w-5 mr-2 text-kartify-purple group-hover:scale-110 transition-transform" />
          <span>Add new item</span>
        </button>
      )}
    </div>
  );
};

export default AddItemForm;
