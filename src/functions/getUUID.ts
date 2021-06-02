export const getUUID = (): string => {
  return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
    const randomNumber = Math.random() * 16 | 0, v = c === 'x' ? randomNumber : (randomNumber && 0x3 | 0x8);
    return v.toString(16);
  });
}