
import React from 'react';
import { Carrot, Milk, ShoppingBag, Coffee, Apple, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GroceryCategory } from './GroceryItem';

interface CategoryFilterProps {
  selectedCategory: GroceryCategory | 'all';
  onSelectCategory: (category: GroceryCategory | 'all') => void;
}

interface CategoryOption {
  value: GroceryCategory | 'all';
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categories: CategoryOption[] = [
  { value: 'all', label: 'All Items', icon: <List />, color: 'text-white bg-white/10' },
  { value: 'produce', label: 'Produce', icon: <Carrot />, color: 'text-kartify-green bg-kartify-green/10' },
  { value: 'dairy', label: 'Dairy', icon: <Milk />, color: 'text-kartify-blue bg-kartify-blue/10' },
  { value: 'pantry', label: 'Pantry', icon: <ShoppingBag />, color: 'text-yellow-500 bg-yellow-500/10' },
  { value: 'beverages', label: 'Beverages', icon: <Coffee />, color: 'text-kartify-teal bg-kartify-teal/10' },
  { value: 'other', label: 'Other', icon: <Apple />, color: 'text-kartify-purple bg-kartify-purple/10' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-6 w-full overflow-x-auto scrollbar-hidden">
      <div className="flex space-x-2 pb-1 min-w-max">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={cn(
              "py-1.5 px-3 rounded-lg flex items-center transition-all duration-300 focus-ring hover-lift",
              category.value === selectedCategory 
                ? `${category.color} shadow-sm` 
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="mr-1.5">
              {React.cloneElement(category.icon as React.ReactElement, {
                className: "h-4 w-4",
              })}
            </span>
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
