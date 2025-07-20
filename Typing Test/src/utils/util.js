/** @format */

export const calculateAccuracy = (wpm, inwpm) => {
  if (wpm === 0) return 0;
  return Math.round((wpm / (wpm + inwpm)) * 100);
};
