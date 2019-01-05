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

// Returns the Caeser shifted string, ignoring not alphabetic letters.
function caeser_shift (offset, input) {
  var result = [];
  for (var i = 0; i < input.length; i++) {
    charNum = input.charCodeAt(i);
    if (charNum >= 65 && charNum <= 90) {
      var letter = input.charCodeAt(i) + offset;
      if (letter > 90) {
        letter-=26;
      }
      result.push(letter);
    } else if (charNum >= 97 && charNum <= 122) {
      var letter = input.charCodeAt(i) + offset;
      if (letter > 122) {
        letter-=26;
      }
      result.push(letter);      
    } else {
      result.push(input.charCodeAt(i));
    }
  }
  return String.fromCharCode.apply(null,result);
}

