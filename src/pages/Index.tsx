
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MorseConverter from '@/components/MorseConverter';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <MorseConverter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
