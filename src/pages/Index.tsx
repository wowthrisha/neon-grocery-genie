
import React from 'react';
import Header from '@/components/layout/Header';
import GroceryList from '@/components/grocery/GroceryList';

const Index = () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <GroceryList />
      </div>
    </div>
  );
};

export default Index;
