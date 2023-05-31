const COUNT_ABBRS = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];

export const formatCount = (count: number, decimals?: number): string => {
  const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
  const result = parseFloat((count / Math.pow(1000, i)).toFixed(decimals || 2));
  return `${result}${COUNT_ABBRS[i]}`;
};
