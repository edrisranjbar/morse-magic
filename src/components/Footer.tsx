
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground">
          Morse Magic © {new Date().getFullYear()} - A modern Morse code converter
        </p>
      </div>
    </footer>
  );
};

export default Footer;
