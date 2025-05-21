import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { morseCodeMap } from '@/utils/morseUtils';
import { Volume2, Star, Trophy, BookOpen, Gamepad2, Dumbbell, ChevronRight, Check, X, Lightbulb, Brain, Clock, Music, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useSettings } from '@/components/ui/settings-dialog';

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'encode' | 'decode'>('encode');
  const [currentMorse, setCurrentMorse] = useState('');
  const [practiceCount, setPracticeCount] = useState(0);
  const { volume, getSpeed } = useSettings();

  const wordsByDifficulty = [
    // Simple words (1-3 letters)
    ['HI', 'SOS', 'YES', 'NO', 'OK'],
    // Medium words (4-5 letters)
    ['HELLO', 'WORLD', 'MORSE', 'LEARN', 'QUICK'],
    // Complex words (6+ letters)
    ['SIGNAL', 'PRACTICE', 'MESSAGE', 'CODING'],
    // Phrases
    ['GOOD JOB', 'WELL DONE', 'KEEP GOING', 'MORSE CODE'],
    // Complex phrases
    ['QUICK BROWN', 'HELLO WORLD', 'GREAT PROGRESS', 'FINAL LEVEL']
  ];

  const commonPatterns = [
    { letter: 'E', morse: '.', mnemonic: 'Easy - just a dot' },
    { letter: 'T', morse: '-', mnemonic: 'Tall line' },
    { letter: 'A', morse: '.-', mnemonic: 'Apple dot dash' },
    { letter: 'N', morse: '-.', mnemonic: 'Negative dash dot' },
    { letter: 'S', morse: '...', mnemonic: 'Simple three dots' },
    { letter: 'O', morse: '---', mnemonic: 'Three long Oh' }
  ];

  const morseTable = {
    letters: [
      { char: 'A', morse: '.-' },
      { char: 'B', morse: '-...' },
      { char: 'C', morse: '-.-.' },
      { char: 'D', morse: '-..' },
      { char: 'E', morse: '.' },
      { char: 'F', morse: '..-.' },
      { char: 'G', morse: '--.' },
      { char: 'H', morse: '....' },
      { char: 'I', morse: '..' },
      { char: 'J', morse: '.---' },
      { char: 'K', morse: '-.-' },
      { char: 'L', morse: '.-..' },
      { char: 'M', morse: '--' },
      { char: 'N', morse: '-.' },
      { char: 'O', morse: '---' },
      { char: 'P', morse: '.--.' },
      { char: 'Q', morse: '--.-' },
      { char: 'R', morse: '.-.' },
      { char: 'S', morse: '...' },
      { char: 'T', morse: '-' },
      { char: 'U', morse: '..-' },
      { char: 'V', morse: '...-' },
      { char: 'W', morse: '.--' },
      { char: 'X', morse: '-..-' },
      { char: 'Y', morse: '-.--' },
      { char: 'Z', morse: '--..' }
    ],
    numbers: [
      { char: '0', morse: '-----' },
      { char: '1', morse: '.----' },
      { char: '2', morse: '..---' },
      { char: '3', morse: '...--' },
      { char: '4', morse: '....-' },
      { char: '5', morse: '.....' },
      { char: '6', morse: '-....' },
      { char: '7', morse: '--...' },
      { char: '8', morse: '---..' },
      { char: '9', morse: '----.' }
    ]
  };

  const getProgressiveSpeed = () => {
    const baseSpeed = getSpeed();
    return baseSpeed * (1 + (practiceCount * 0.05));
  };

  const playMorseSound = (morse: string, speed = 1) => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Add a compressor for better sound quality
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, audioContext.currentTime);
    compressor.knee.setValueAtTime(40, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);
    
    // Create a filter for smoother sound
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, audioContext.currentTime);
    filter.Q.setValueAtTime(1, audioContext.currentTime);
    
    // Connect the audio nodes
    oscillator.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(compressor);
    compressor.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    let time = audioContext.currentTime;
    const baseUnit = 0.15;
    const unit = baseUnit / getProgressiveSpeed();
    const rampTime = 0.005;
    
    morse.split('').forEach((char) => {
      if (char === '.') {
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(volume, time + rampTime);
        time += unit;
        gainNode.gain.linearRampToValueAtTime(0, time - rampTime);
        time += unit * 0.2;
      } else if (char === '-') {
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(volume, time + rampTime);
        time += unit * 3;
        gainNode.gain.linearRampToValueAtTime(0, time - rampTime);
        time += unit * 0.2;
      } else if (char === ' ') {
        time += unit * 4;
      }
    });
    
    oscillator.start();
    oscillator.stop(time + 0.1);
    
    setTimeout(() => {
      oscillator.disconnect();
      gainNode.disconnect();
      filter.disconnect();
      compressor.disconnect();
    }, (time + 0.2) * 1000);
  };

  const getRandomWord = () => {
    if (practiceCount >= 20) {
      toast.success('Congratulations! You have completed all 20 practice examples! 🎉');
      setCurrentWord('');
      setCurrentMorse('');
      return;
    }

    const difficultyLevel = Math.min(Math.floor(practiceCount / 4), 4);
    const words = wordsByDifficulty[difficultyLevel];
    const word = words[Math.floor(Math.random() * words.length)];
    
    setCurrentWord(word);
    setCurrentMorse(word.split('').map(c => morseCodeMap[c] || ' ').join(' '));
    setUserInput('');
    setShowAnswer(false);
    
    // Update speed calculation for smoother progression
    // Speed will increase from 1 to 2 (faster) as practice progresses
    const speed = getProgressiveSpeed();
  };

  const checkAnswer = () => {
    let isCorrect = false;
    if (practiceMode === 'encode') {
      const expectedMorse = currentWord.split('').map(c => morseCodeMap[c] || ' ').join(' ');
      isCorrect = userInput.trim() === expectedMorse.trim();
    } else {
      isCorrect = userInput.trim().toUpperCase() === currentWord;
    }

    if (isCorrect) {
      const pointsEarned = 100 + (Math.floor(practiceCount / 4) * 20); // More points for harder levels
      setScore(score + pointsEarned);
      setStreak(streak + 1);
      setPracticeCount(practiceCount + 1);
      toast.success(`Correct! +${pointsEarned} points`);
      if (streak > 0 && streak % 5 === 0) {
        toast.success('🔥 Streak bonus! +50 points');
        setScore(score + 50);
      }
    } else {
      setStreak(0);
      toast.error('Try again!');
    }
    setShowAnswer(true);
  };

  const learningKeyPoints = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Learn by Sound, Not Sight",
      points: [
        "Focus on the rhythm and sound patterns rather than dots and dashes",
        "Each character has a unique sound signature - learn to recognize it",
        "Practice listening more than writing"
      ]
    },
    {
      icon: <Music className="w-5 h-5" />,
      title: "Rhythm and Timing",
      points: [
        "Maintain consistent timing between dots and dashes",
        "A dash is three times longer than a dot",
        "Keep proper spacing between letters and words"
      ]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Practice Strategy",
      points: [
        "Start with common letters (E, T, A, N, I, M)",
        "Practice in short, frequent sessions (15-20 minutes)",
        "Gradually increase speed rather than starting fast"
      ]
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Memory Techniques",
      points: [
        "Create mnemonics for difficult letters",
        "Group similar patterns together",
        "Practice both encoding and decoding"
      ]
    }
  ];

  return (
    <div className="container py-8 space-y-8">
      <Tabs defaultValue="presentation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="presentation" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presentation" className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Morse Code Basics</h2>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Elements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Dot (.) - Short beep</li>
                    <li>Dash (-) - Long beep (3x dot length)</li>
                    <li>Space between letters - 3 dot lengths</li>
                    <li>Space between words - 7 dot lengths</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Common Patterns</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {commonPatterns.map(pattern => (
                      <div key={pattern.letter} className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-mono">{pattern.letter}</span>
                          <code className="bg-secondary px-2 py-1 rounded">{pattern.morse}</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playMorseSound(pattern.morse)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Key Points for Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningKeyPoints.map((section) => (
                    <Card key={section.title}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            {section.icon}
                          </div>
                          <h4 className="font-semibold">{section.title}</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {section.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Complete Morse Code Reference</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold">Letters</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {morseTable.letters.map(({ char, morse }) => (
                          <Button
                            key={char}
                            variant="outline"
                            className="flex items-center justify-between gap-2 h-12 px-3"
                            onClick={() => playMorseSound(morse)}
                          >
                            <span className="font-mono text-lg">{char}</span>
                            <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">{morse}</code>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold">Numbers</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {morseTable.numbers.map(({ char, morse }) => (
                          <Button
                            key={char}
                            variant="outline"
                            className="flex items-center justify-between gap-2 h-12 px-3"
                            onClick={() => playMorseSound(morse)}
                          >
                            <span className="font-mono text-lg">{char}</span>
                            <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">{morse}</code>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">Practice Mode</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    {score} pts
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {streak} streak
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                    {practiceCount}/20
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-4 justify-center">
                <Button
                  variant={practiceMode === 'encode' ? 'default' : 'outline'}
                  onClick={() => setPracticeMode('encode')}
                  className="flex-1 sm:flex-initial px-3 sm:px-4"
                >
                  Text → Morse
                </Button>
                <Button
                  variant={practiceMode === 'decode' ? 'default' : 'outline'}
                  onClick={() => setPracticeMode('decode')}
                  className="flex-1 sm:flex-initial px-3 sm:px-4"
                >
                  Morse → Text
                </Button>
              </div>

              {practiceCount >= 20 ? (
                <div className="text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">Practice Complete! 🎉</h3>
                  <p>You've completed all 20 practice examples.</p>
                  <p className="text-lg font-semibold">Final Score: {score}</p>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setPracticeCount(0);
                      setScore(0);
                      setStreak(0);
                      getRandomWord();
                    }}
                  >
                    Start New Practice Session
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-4">
                    <div className="text-2xl sm:text-4xl font-mono min-h-[48px] sm:min-h-[60px] break-all">
                      {practiceMode === 'encode' ? currentWord : currentMorse || 'Click Start to begin'}
                    </div>
                    {currentWord && (
                      <div className="flex items-center justify-center">
                        <Button
                          size="lg"
                          className="w-full sm:w-auto"
                          onClick={() => playMorseSound(
                            currentWord.split('').map(c => morseCodeMap[c] || ' ').join(' ')
                          )}
                        >
                          <Volume2 className="mr-2 h-4 w-4" />
                          Play Sound
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Progress value={(practiceCount / 20) * 100} className="w-full" />
                    
                    <Textarea
                      placeholder={practiceMode === 'encode' ? 
                        "Type the Morse code here (use dots and dashes)..." :
                        "Type the text here..."
                      }
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="font-mono text-base sm:text-lg min-h-[80px] sm:min-h-[100px] resize-none"
                    />

                    {showAnswer && (
                      <div className="p-3 sm:p-4 rounded bg-secondary/20 space-y-2 sm:space-y-3 text-sm sm:text-base">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <strong>Correct Answer:</strong>
                          <code className="bg-secondary px-2 py-1 rounded break-all">
                            {practiceMode === 'encode' ? currentMorse : currentWord}
                          </code>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <strong>Your Answer:</strong>
                          <code className="bg-secondary px-2 py-1 rounded break-all">
                            {userInput}
                          </code>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={getRandomWord}
                      >
                        {currentWord ? 'Next Word' : 'Start Practice'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={checkAnswer}
                        disabled={!currentWord || !userInput}
                      >
                        Check Answer
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learn; 