
import React from 'react';
import { ShoppingCart, BarChart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between glass mb-8 rounded-lg animate-fade-in">
      <div className="flex items-center">
        <ShoppingCart className="h-7 w-7 text-kartify-purple mr-3" />
        <h1 className="text-2xl font-semibold text-white relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kartify-purple to-kartify-blue">
            Kartify
          </span>
          <span className="absolute -top-2 -right-6 text-xs bg-kartify-purple text-white px-1.5 py-0.5 rounded-md">
            Beta
          </span>
        </h1>
      </div>
      
      <div className="flex space-x-4">
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors focus-ring">
          <Bell className="h-5 w-5 text-white/70" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-kartify-green rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors focus-ring">
          <BarChart className="h-5 w-5 text-white/70" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kartify-purple to-kartify-blue flex items-center justify-center text-white text-sm font-medium">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
