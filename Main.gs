// Converts a string to capital letters without whitespace or punctuation, and uppercases.
// "Hello, World!" => "HELLOWORLD"
function NORMALIZE_STRING(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// Returns the nth non-whitespace character of the given string, starting at 1.
// NTH("Hello, world!", 6) => "W"
function NTH(text, n) {
  if (n < 1 || n > text.length) return '?'
  return NORMALIZE_STRING(text).slice(n - 1, n);
}
