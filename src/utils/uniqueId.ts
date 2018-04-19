let idCounter = 0;

export default (prefix: string) => {
  const id = ++idCounter;
  return `${prefix}${id}`;
};