export const getOrdinalSuffix = (number: number) => {
  const remainderHundred = number % 100;
  if (remainderHundred >= 11 && remainderHundred <= 13) return 'th';

  switch (number % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}