import MorseConverter from '@/components/MorseConverter';
import { Helmet } from 'react-helmet-async';

const Convert = () => {
  return (
    <>
      <Helmet>
        <title>Convert - Morse Magic</title>
        <meta name="description" content="Convert text to Morse code and vice versa with our real-time Morse code translator. Free, fast, and easy to use." />
        <meta name="keywords" content="morse code converter, morse code translator, text to morse code, morse code to text" />
        <link rel="canonical" href="/convert" />
      </Helmet>
      
      <div className="container px-4 py-4 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Morse Code Converter</h1>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Convert between text and Morse code instantly. Use dots (.) and dashes (-) for Morse code input.
            </p>
          </div>
          <MorseConverter />
        </div>
      </div>
    </>
  );
};

export default Convert; 