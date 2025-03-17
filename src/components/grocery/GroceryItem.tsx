
import React, { useState } from 'react';
import { Check, Edit, Trash2, Carrot, Apple, Milk, Coffee, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export type GroceryCategory = 'produce' | 'dairy' | 'pantry' | 'beverages' | 'other';

export interface GroceryItemProps {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  isChecked: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, category: GroceryCategory, quantity: number) => void;
}

const categoryIcons: Record<GroceryCategory, React.ReactNode> = {
  produce: <Carrot className="h-4 w-4" />,
  dairy: <Milk className="h-4 w-4" />,
  pantry: <ShoppingBag className="h-4 w-4" />,
  beverages: <Coffee className="h-4 w-4" />,
  other: <Apple className="h-4 w-4" />,
};

const categoryColors: Record<GroceryCategory, string> = {
  produce: 'text-kartify-green bg-kartify-green/10',
  dairy: 'text-kartify-blue bg-kartify-blue/10',
  pantry: 'text-yellow-500 bg-yellow-500/10',
  beverages: 'text-kartify-teal bg-kartify-teal/10',
  other: 'text-kartify-purple bg-kartify-purple/10',
};

const GroceryItem: React.FC<GroceryItemProps> = ({
  id,
  name,
  category,
  quantity,
  isChecked,
  onToggle,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editCategory, setEditCategory] = useState(category);
  const [editQuantity, setEditQuantity] = useState(quantity);

  const handleSave = () => {
    onEdit(id, editName, editCategory, editQuantity);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(name);
      setEditCategory(category);
      setEditQuantity(quantity);
    }
  };

  return (
    <div 
      className={cn(
        "w-full p-3 rounded-lg glass mb-3 group transition-all duration-300 animate-slide-in hover-lift",
        isChecked ? "border-kartify-purple/30" : "border-white/5",
        isEditing ? "ring-1 ring-kartify-purple/50" : ""
      )}
    >
      {isEditing ? (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white/5 border-none text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-kartify-purple/30"
              autoFocus
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as GroceryCategory)}
              className="bg-white/5 border-none text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-kartify-purple/30"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="pantry">Pantry</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              min="1"
              value={editQuantity}
              onChange={(e) => setEditQuantity(Number(e.target.value))}
              className="bg-white/5 border-none text-white p-2 rounded w-24 focus:outline-none focus:ring-1 focus:ring-kartify-purple/30"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditName(name);
                setEditCategory(category);
                setEditQuantity(quantity);
              }}
              className="px-3 py-1 rounded text-sm bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded text-sm bg-kartify-purple/80 text-white hover:bg-kartify-purple transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggle(id)}
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center transition-colors",
                isChecked ? "bg-kartify-purple text-white" : "bg-white/5"
              )}
            >
              {isChecked && <Check className="h-3 w-3" />}
            </button>
            <div className="flex flex-col">
              <span 
                className={cn(
                  "text-md font-medium transition-all", 
                  isChecked ? "line-through text-white/50" : "text-white"
                )}
              >
                {name}
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={cn("text-xs px-2 py-0.5 rounded-full inline-flex items-center space-x-1", categoryColors[category])}>
                  {categoryIcons[category]}
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </span>
                <span className="text-xs text-white/50">Qty: {quantity}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-full hover:bg-white/5 text-white/70 transition-colors focus-ring"
              aria-label="Edit item"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(id)}
              className="p-1.5 rounded-full hover:bg-white/5 text-white/70 transition-colors focus-ring"
              aria-label="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryItem;
