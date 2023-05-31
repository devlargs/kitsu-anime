export const truncateString = (str: string): string => {
  if (str.length > 18) {
    return str.slice(0, 18) + '...';
  }
  return str;
};
