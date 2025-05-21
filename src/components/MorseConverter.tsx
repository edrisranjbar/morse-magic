import { useState, useEffect } from 'react';
import { textToMorse, morseToText } from '../utils/morseUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy, RefreshCw, Volume2, ArrowUpDown } from 'lucide-react';

const MorseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [morseMode, setMorseMode] = useState<'encode' | 'decode'>('encode');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      if (morseMode === 'encode') {
        const morse = textToMorse(inputText);
        setOutputText(morse);
      } else {
        const text = morseToText(inputText);
        setOutputText(text);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Invalid input for conversion');
    }
  }, [inputText, morseMode]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success('Output copied to clipboard');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    toast.info('Input cleared');
  };

  const toggleMode = () => {
    setMorseMode(prev => prev === 'encode' ? 'decode' : 'encode');
    handleClear();
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
    const unit = 0.1;
    
    outputText.split('').forEach((char) => {
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
      audioContext.close();
    }, (time - audioContext.currentTime) * 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Morse Code Converter
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {morseMode === 'encode' ? 'Text → Morse' : 'Morse → Text'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMode}
              className="transition-transform hover:rotate-180"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder={morseMode === 'encode' ? "Type your text here..." : "Enter Morse code (use dots and dashes)..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px] font-mono"
          />
        </div>
        <div className="space-y-2">
          <Textarea
            readOnly
            value={outputText}
            className="min-h-[100px] font-mono bg-secondary/50"
            placeholder="Output will appear here..."
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleClear}
            className="transition-transform active:scale-95"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={handleCopyToClipboard}
            className="transition-transform active:scale-95"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
        </div>
        {morseMode === 'encode' && (
          <Button
            onClick={playMorseCode}
            disabled={isPlaying || !outputText}
            className="transition-transform active:scale-95"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            {isPlaying ? 'Playing...' : 'Play Sound'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MorseConverter;
