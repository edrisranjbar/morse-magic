import { useState, useEffect, useRef } from 'react';
import { textToMorse, morseToText, parseToSymbols, MorseSymbol } from '../utils/morseUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy, RefreshCw, Volume2, Lightbulb, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AnimationPreset = 'fade' | 'slide' | 'bounce' | 'flash';

const MorseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [morseMode, setMorseMode] = useState<'encode' | 'decode'>('encode');
  const [morseSymbols, setMorseSymbols] = useState<MorseSymbol[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationPreset, setAnimationPreset] = useState<AnimationPreset>('fade');
  const [isFlashing, setIsFlashing] = useState(false);
  const [telegraphInput, setTelegraphInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const pressStartTimeRef = useRef<number>(0);
  const lastKeyUpTimeRef = useRef<number>(0);

  useEffect(() => {
    try {
      if (morseMode === 'encode') {
        const morse = textToMorse(inputText);
        setOutputText(morse);
        setMorseSymbols(parseToSymbols(morse));
      } else {
        const text = morseToText(inputText);
        setOutputText(text);
        setMorseSymbols(parseToSymbols(inputText));
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Invalid input for conversion');
    }
  }, [inputText, morseMode]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success('Output copied to clipboard');
  };

  const handleClear = () => {
    setInputText('');
    setTelegraphInput('');
    setOutputText('');
    toast.info('Input cleared');
  };

  const toggleMode = () => {
    setMorseMode(prev => prev === 'encode' ? 'decode' : 'encode');
    handleClear();
  };

  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteTimeDomainData(dataArray);

    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animationFrameRef.current = requestAnimationFrame(drawWaveform);
  };

  const playMorseCode = () => {
    setIsPlaying(true);
    audioContextRef.current = new AudioContext();
    const audioContext = audioContextRef.current;
    
    analyserRef.current = audioContext.createAnalyser();
    const analyser = analyserRef.current;
    analyser.fftSize = 2048;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    let time = audioContext.currentTime;
    const unit = 0.1;
    
    drawWaveform();
    
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }, (time - audioContext.currentTime) * 1000);
  };

  const getSymbolAnimation = (preset: AnimationPreset) => {
    switch (preset) {
      case 'fade':
        return 'animate-in fade-in duration-300';
      case 'slide':
        return 'animate-in slide-in-from-left duration-300';
      case 'bounce':
        return 'animate-bounce';
      case 'flash':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  const toggleFlashlight = () => {
    setIsFlashing(!isFlashing);
  };

  const setupAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();
      analyserRef.current = audioContextRef.current.createAnalyser();

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);

      oscillatorRef.current.start();
    }
  };

  const handleKeyDown = () => {
    if (!isFlashing) {
      setupAudioContext();
      setIsFlashing(true);
      pressStartTimeRef.current = Date.now();
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
      }
    }
  };

  const handleKeyUp = () => {
    if (isFlashing) {
      setIsFlashing(false);
      const pressDuration = Date.now() - pressStartTimeRef.current;
      const timeSinceLastKeyUp = pressStartTimeRef.current - lastKeyUpTimeRef.current;
      
      // Determine if it's a dot (< 200ms) or dash (>= 200ms)
      const symbol = pressDuration < 200 ? '.' : '-';
      
      // Add space if the time since last key up is greater than 500ms
      const space = timeSinceLastKeyUp > 500 ? ' ' : '';
      
      setTelegraphInput(prev => prev + space + symbol);
      lastKeyUpTimeRef.current = Date.now();

      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
    }
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
              className="transition-transform hover:scale-105"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium flex items-center justify-between">
            <span>{morseMode === 'encode' ? 'Text Input' : 'Morse Code Input'}</span>
            <span className="text-xs text-muted-foreground">
              {inputText.length} characters
            </span>
          </label>
          <Textarea
            id="input-text"
            placeholder={morseMode === 'encode' ? "Type your text here..." : "Enter Morse code (use dots and dashes)..."}
            className="min-h-[120px] resize-none transition-all duration-200 focus-visible:ring-primary/20 focus-visible:ring-offset-2 font-mono"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="output-text" className="text-sm font-medium flex items-center justify-between">
            <span>{morseMode === 'encode' ? 'Morse Code Output' : 'Text Output'}</span>
            <span className="text-xs text-muted-foreground">
              {outputText.length} characters
            </span>
          </label>
          <Textarea
            id="output-text"
            readOnly
            className="min-h-[120px] resize-none bg-secondary/50 font-mono"
            value={outputText}
          />
        </div>

        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="visual">Visual Display</TabsTrigger>
            <TabsTrigger value="telegraph">Telegraph Key</TabsTrigger>
            <TabsTrigger value="waveform">Waveform</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationPreset('fade')}
                className={cn(
                  "flex-1",
                  animationPreset === 'fade' && "bg-primary/10"
                )}
              >
                Fade
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationPreset('slide')}
                className={cn(
                  "flex-1",
                  animationPreset === 'slide' && "bg-primary/10"
                )}
              >
                Slide
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationPreset('bounce')}
                className={cn(
                  "flex-1",
                  animationPreset === 'bounce' && "bg-primary/10"
                )}
              >
                Bounce
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationPreset('flash')}
                className={cn(
                  "flex-1",
                  animationPreset === 'flash' && "bg-primary/10"
                )}
              >
                Flash
              </Button>
            </div>
            
            <div className="relative">
              {morseSymbols.length > 0 ? (
                <div className="p-4 bg-secondary/50 rounded-md min-h-[120px] morse-container overflow-auto">
                  <div className="flex flex-wrap gap-2">
                    {morseSymbols.map((charSymbols, charIndex) => (
                      <div 
                        key={charIndex} 
                        className={cn(
                          "flex items-center gap-1 p-2 bg-background/50 rounded-md morse-char group hover:bg-background/80 transition-colors",
                          getSymbolAnimation(animationPreset)
                        )}
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
                  {morseMode === 'encode' ? 'Morse code will appear here' : 'Enter Morse code to see visualization'}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="telegraph">
            <div className="p-4 bg-secondary/50 rounded-md min-h-[200px] flex flex-col items-center justify-center gap-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Press and hold briefly for dots (.), longer for dashes (-).
                </p>
                <div className="font-mono text-lg">
                  {telegraphInput || 'Your Morse code will appear here'}
                </div>
              </div>
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-colors",
                isFlashing ? "bg-yellow-400" : "bg-secondary"
              )}>
                <Lightbulb className={cn(
                  "w-12 h-12",
                  isFlashing ? "text-yellow-600" : "text-muted-foreground"
                )} />
              </div>
              <Button
                size="lg"
                className={cn(
                  "w-32 h-16 transition-transform active:translate-y-1",
                  isFlashing && "translate-y-1 bg-primary/90"
                )}
                onMouseDown={handleKeyDown}
                onMouseUp={handleKeyUp}
                onMouseLeave={handleKeyUp}
                onTouchStart={handleKeyDown}
                onTouchEnd={handleKeyUp}
              >
                Press Key
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="waveform">
            <div className="p-4 bg-secondary/50 rounded-md min-h-[120px]">
              <canvas
                ref={canvasRef}
                className="w-full h-[120px]"
                width={600}
                height={120}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={!inputText && !telegraphInput}
          className="transition-all duration-200 hover:bg-destructive/10"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", (!inputText && !telegraphInput) && "opacity-50")} />
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={playMorseCode}
          disabled={!outputText || isPlaying || morseMode === 'decode'}
          className="transition-all duration-200 hover:bg-primary/10"
        >
          <Volume2 className={cn("mr-2 h-4 w-4", (!outputText || isPlaying || morseMode === 'decode') && "opacity-50")} />
          {isPlaying ? 'Playing...' : 'Play Sound'}
        </Button>
        <Button 
          onClick={handleCopyToClipboard}
          disabled={!outputText}
          className="transition-all duration-200"
        >
          <Copy className={cn("mr-2 h-4 w-4", !outputText && "opacity-50")} />
          Copy Output
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MorseConverter;
