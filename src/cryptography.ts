export const encryptWithXOR = (value: string, key = 5) => value
  .split('')
  .map(c => (c.charCodeAt(0) ^ key).toString(16))
  .join('');
