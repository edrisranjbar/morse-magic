
import React, { useState, useEffect } from 'react';
import { textToMorse, parseToSymbols, MorseSymbol } from '../utils/morseUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy, RefreshCw } from 'lucide-react';

const MorseConverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [morseSymbols, setMorseSymbols] = useState<MorseSymbol[][]>([]);

  useEffect(() => {
    const morse = textToMorse(inputText);
    setMorseCode(morse);
    setMorseSymbols(parseToSymbols(morse));
  }, [inputText]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(morseCode);
    toast.success('Morse code copied to clipboard');
  };

  const handleClear = () => {
    setInputText('');
    toast.info('Input cleared');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">Text to Morse Converter</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium">
            Text Input
          </label>
          <Textarea
            id="input-text"
            placeholder="Type your text here..."
            className="min-h-[120px] resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="morse-output" className="text-sm font-medium flex justify-between items-center">
            <span>Morse Code Output</span>
            <span className="text-xs text-muted-foreground">
              {morseCode.length > 0 ? `${morseCode.length} characters` : 'No output'}
            </span>
          </label>
          {morseSymbols.length > 0 ? (
            <div className="p-4 bg-secondary/50 rounded-md min-h-[120px] morse-container overflow-auto">
              {morseSymbols.map((charSymbols, charIndex) => (
                <div key={charIndex} className="morse-char">
                  {charSymbols.map((symbol, symbolIndex) => (
                    <div 
                      key={symbolIndex} 
                      className={`morse-${symbol.type}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-secondary/50 rounded-md min-h-[120px] flex items-center justify-center text-muted-foreground">
              Morse code will appear here
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={!inputText}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button 
          onClick={handleCopyToClipboard}
          disabled={!morseCode}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Morse Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MorseConverter;
