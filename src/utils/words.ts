export const thanksgivingWords = [
  'turkey',
  'grateful',
  'family',
  'feast',
  'autumn',
  'harvest',
  'thankful',
  'gathering',
  'cornucopia',
  'cranberry',
  'stuffing',
  'pumpkin',
  'gravy',
  'celebration',
  'november',
  'pilgrim',
  'blessing',
  'tradition',
  'fellowship',
  'abundance'
];

export const getRandomWord = () => {
  return thanksgivingWords[Math.floor(Math.random() * thanksgivingWords.length)];
};