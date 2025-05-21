import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { morseCodeMap } from '@/utils/morseUtils';
import { Volume2 } from 'lucide-react';

const Learn = () => {
  const [currentChar, setCurrentChar] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = [
    { title: 'Letters', items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') },
    { title: 'Numbers', items: '0123456789'.split('') },
    { title: 'Punctuation', items: '.,?!'.split('') }
  ];

  const playMorseSound = (morse: string) => {
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
    
    morse.split('').forEach((char) => {
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
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Learn Morse Code</h1>
        <p className="lead">
          Master Morse code through interactive lessons and practice exercises.
          Start with basic letters and progress to numbers and punctuation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Card key={category.title}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {category.items.map(char => (
                  <Button
                    key={char}
                    variant="outline"
                    className="aspect-square text-lg font-mono relative group"
                    onClick={() => {
                      setCurrentChar(char);
                      setShowAnswer(false);
                      playMorseSound(morseCodeMap[char]);
                    }}
                  >
                    {char}
                    <span className="absolute -top-8 scale-0 transition-all rounded bg-slate-900 p-2 text-xs text-white group-hover:scale-100">
                      {morseCodeMap[char]}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">Practice Mode</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-mono min-h-[80px] flex items-center">
              {currentChar || 'Click a character to start'}
            </div>
            {currentChar && (
              <>
                <Button
                  size="lg"
                  onClick={() => playMorseSound(morseCodeMap[currentChar])}
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Play Sound
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? morseCodeMap[currentChar] : 'Show Morse Code'}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Tips for Learning</h2>
        <ul>
          <li>Start with common letters (E, T, A, N)</li>
          <li>Practice listening more than writing</li>
          <li>Learn by sound patterns, not dots and dashes</li>
          <li>Use mnemonics to remember patterns</li>
          <li>Practice regularly in short sessions</li>
        </ul>

        <h2>Common Patterns</h2>
        <ul>
          <li><strong>E</strong> (.) - Most common letter, single dot</li>
          <li><strong>T</strong> (-) - Second most common, single dash</li>
          <li><strong>A</strong> (.-) - Third most common</li>
          <li><strong>O</strong> (---) - All dashes</li>
          <li><strong>I</strong> (..) - All dots</li>
        </ul>
      </div>
    </div>
  );
};

export default Learn; 