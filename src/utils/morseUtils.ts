
export const morseCodeMap: Record<string, string> = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  ' ': '/'
};

export const textToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map((char) => morseCodeMap[char] || char)
    .join(' ');
};

export interface MorseSymbol {
  type: 'dot' | 'dash' | 'space' | 'char-space';
}

export const parseToSymbols = (morse: string): MorseSymbol[][] => {
  return morse.split(' ').map((charMorse) => {
    if (charMorse === '/') {
      return [{ type: 'space' }];
    }
    
    return charMorse.split('').map((symbol) => {
      if (symbol === '.') return { type: 'dot' };
      if (symbol === '-') return { type: 'dash' };
      return { type: 'char-space' };
    });
  });
};
