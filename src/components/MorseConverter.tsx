import React, { useState, useEffect } from 'react';
import { textToMorse, parseToSymbols, MorseSymbol } from '../utils/morseUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy, RefreshCw, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MorseConverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [morseSymbols, setMorseSymbols] = useState<MorseSymbol[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playMorseCode = () => {
    setIsPlaying(true);
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    let time = audioContext.currentTime;
    const unit = 0.1; // Duration of a dot
    
    morseCode.split('').forEach((char) => {
      if (char === '.') {
        gainNode.gain.setValueAtTime(0.5, time);
        time += unit;
        gainNode.gain.setValueAtTime(0, time);
        time += unit;
      } else if (char === '-') {
        gainNode.gain.setValueAtTime(0.5, time);
        time += unit * 3;
        gainNode.gain.setValueAtTime(0, time);
        time += unit;
      } else if (char === ' ') {
        time += unit * 3;
      }
    });
    
    oscillator.start();
    oscillator.stop(time);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, (time - audioContext.currentTime) * 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Text to Morse Converter
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium flex items-center justify-between">
            <span>Text Input</span>
            <span className="text-xs text-muted-foreground">
              {inputText.length} characters
            </span>
          </label>
          <Textarea
            id="input-text"
            placeholder="Type your text here..."
            className="min-h-[120px] resize-none transition-all duration-200 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
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
          <div className="relative">
            {morseSymbols.length > 0 ? (
              <div className="p-4 bg-secondary/50 rounded-md min-h-[120px] morse-container overflow-auto">
                <div className="flex flex-wrap gap-2">
                  {morseSymbols.map((charSymbols, charIndex) => (
                    <div 
                      key={charIndex} 
                      className="flex items-center gap-1 p-2 bg-background/50 rounded-md morse-char group hover:bg-background/80 transition-colors"
                    >
                      {charSymbols.map((symbol, symbolIndex) => (
                        <div 
                          key={symbolIndex} 
                          className={cn(
                            "transition-all duration-200 group-hover:scale-110",
                            symbol.type === 'dot' ? 'size-2 rounded-full bg-primary' : 'w-5 h-2 rounded-full bg-primary'
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-secondary/50 rounded-md min-h-[120px] flex items-center justify-center text-muted-foreground">
                Morse code will appear here
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={!inputText}
          className="transition-all duration-200 hover:bg-destructive/10"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", !inputText && "opacity-50")} />
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={playMorseCode}
          disabled={!morseCode || isPlaying}
          className="transition-all duration-200 hover:bg-primary/10"
        >
          <Volume2 className={cn("mr-2 h-4 w-4", (!morseCode || isPlaying) && "opacity-50")} />
          {isPlaying ? 'Playing...' : 'Play Sound'}
        </Button>
        <Button 
          onClick={handleCopyToClipboard}
          disabled={!morseCode}
          className="transition-all duration-200"
        >
          <Copy className={cn("mr-2 h-4 w-4", !morseCode && "opacity-50")} />
          Copy Morse Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MorseConverter;
