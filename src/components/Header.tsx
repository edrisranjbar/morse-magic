
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
          Morse Magic
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Convert text to Morse code effortlessly with dots and dashes
        </p>
      </div>
    </header>
  );
};

export default Header;
