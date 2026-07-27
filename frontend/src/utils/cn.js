/**
 * Utility function for conditionally joining class names together.
 * Supports strings, objects, arrays, and falsy values.
 */
export function cn(...inputs) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string') return input.split(' ');
      if (Array.isArray(input)) return cn(...input).split(' ');
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
}

export default cn;
