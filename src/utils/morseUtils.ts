export interface MorseSymbol {
  type: 'dot' | 'dash' | 'space';
}

const morseCodeMap: { [key: string]: string } = {
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
  '!': '-.-.--',
  ' ': ' ',
};

// Create reverse mapping for decoding
const reverseMorseCodeMap: { [key: string]: string } = Object.entries(morseCodeMap).reduce(
  (acc, [char, morse]) => ({
    ...acc,
    [morse]: char
  }),
  {}
);

export const textToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseCodeMap[char] || char)
    .join(' ');
};

export const morseToText = (morse: string): string => {
  return morse
    .trim()
    .split(' ')
    .map(code => {
      if (code === '') return ' ';
      const char = reverseMorseCodeMap[code];
      if (!char) throw new Error(`Invalid Morse code: ${code}`);
      return char;
    })
    .join('')
    .trim();
};

export const parseToSymbols = (morse: string): MorseSymbol[][] => {
  return morse
    .split(' ')
    .map(char =>
      char.split('').map(symbol => ({
        type: symbol === '.' ? 'dot' : symbol === '-' ? 'dash' : 'space'
      }))
    );
};
