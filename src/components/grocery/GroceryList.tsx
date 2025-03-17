
import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingBag, List, Share2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import GroceryItem, { GroceryCategory } from './GroceryItem';
import AddItemForm from './AddItemForm';
import CategoryFilter from './CategoryFilter';

export interface GroceryItemType {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  isChecked: boolean;
}

const defaultItems: GroceryItemType[] = [
  { id: '1', name: 'Apples', category: 'produce', quantity: 5, isChecked: false },
  { id: '2', name: 'Milk', category: 'dairy', quantity: 1, isChecked: false },
  { id: '3', name: 'Bread', category: 'pantry', quantity: 2, isChecked: true },
  { id: '4', name: 'Coffee', category: 'beverages', quantity: 1, isChecked: false },
  { id: '5', name: 'Avocados', category: 'produce', quantity: 3, isChecked: false }
];

const GroceryList: React.FC = () => {
  const [items, setItems] = useState<GroceryItemType[]>(defaultItems);
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | 'all'>('all');
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);
  
  const handleAddItem = (name: string, category: GroceryCategory, quantity: number) => {
    const newItem: GroceryItemType = {
      id: Date.now().toString(),
      name,
      category,
      quantity,
      isChecked: false
    };
    
    setItems(prevItems => [newItem, ...prevItems]);
  };
  
  const handleToggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleEditItem = (id: string, name: string, category: GroceryCategory, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, name, category, quantity } : item
      )
    );
  };
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const uncheckedItems = filteredItems.filter(item => !item.isChecked);
  const checkedItems = filteredItems.filter(item => item.isChecked);
  
  const dismissAiSuggestion = () => {
    setShowAiSuggestion(false);
  };
  
  const addSuggestedItem = () => {
    handleAddItem('Bananas', 'produce', 1);
    setShowAiSuggestion(false);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5 text-kartify-purple" />
          <h2 className="text-xl font-medium text-white">Shopping List</h2>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors focus-ring">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {showAiSuggestion && (
        <div className="mb-6 p-4 glass rounded-lg border border-kartify-purple/20 animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 mt-1">
              <div className="w-8 h-8 rounded-full bg-kartify-purple/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-kartify-purple animate-pulse-glow" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-sm font-medium text-white">AI Suggestion</h3>
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-kartify-purple/20 text-kartify-purple">
                  Smart
                </span>
              </div>
              <p className="text-sm text-white/70 mb-3">
                You've purchased bananas in your last 3 shopping trips. Would you like to add them to your list?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={addSuggestedItem}
                  className="px-3 py-1 text-sm rounded-md bg-kartify-purple/80 text-white hover:bg-kartify-purple transition-colors hover:shadow-neon-purple transition-glow"
                >
                  Add Bananas
                </button>
                <button
                  onClick={dismissAiSuggestion}
                  className="px-3 py-1 text-sm rounded-md bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AddItemForm onAdd={handleAddItem} />
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      <div className="mb-1 px-1 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/70">
          {uncheckedItems.length} {uncheckedItems.length === 1 ? 'item' : 'items'} left
        </h3>
        
        {checkedItems.length > 0 && (
          <button 
            onClick={() => setItems(prevItems => prevItems.filter(item => !item.isChecked))}
            className="text-xs text-kartify-purple hover:text-kartify-purple/80 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {uncheckedItems.length === 0 && checkedItems.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center glass rounded-lg animate-fade-in">
            <List className="h-12 w-12 text-white/20 mb-2" />
            <h3 className="text-lg font-medium text-white mb-1">Your list is empty</h3>
            <p className="text-sm text-white/50 max-w-xs mb-4">
              Add grocery items to your list to keep track of what you need to buy
            </p>
            <button
              onClick={() => handleAddItem('New Item', 'other', 1)}
              className="flex items-center px-4 py-2 rounded-lg bg-kartify-purple text-white hover:bg-opacity-90 transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Add first item</span>
            </button>
          </div>
        ) : (
          <>
            {uncheckedItems.map(item => (
              <GroceryItem
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                quantity={item.quantity}
                isChecked={item.isChecked}
                onToggle={handleToggleItem}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
              />
            ))}
            
            {checkedItems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-white/50 mb-2 px-1">
                  Completed ({checkedItems.length})
                </h3>
                <div className="space-y-2 opacity-70">
                  {checkedItems.map(item => (
                    <GroceryItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      quantity={item.quantity}
                      isChecked={item.isChecked}
                      onToggle={handleToggleItem}
                      onDelete={handleDeleteItem}
                      onEdit={handleEditItem}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroceryList;
