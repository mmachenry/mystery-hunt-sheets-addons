// Converts a string to capital letters without whitespace or punctuation, and uppercases.
// "Hello, World!" => "HELLOWORLD"
function normalizeString(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// Returns the nth non-whitespace character of the given string, starting at 1.
// NTH("Hello, world!", 6) => "W"
function nth(text, n) {
  if (n < 1 || n > text.length) return '?'
  return NORMALIZE_STRING(text).slice(n - 1, n);
}

// Returns the Caeser shifted string, ignoring non alphabetic letters.
function caeserShift (offset, input) {
  var result = [];
  for (var i = 0; i < input.length; i++) {
    var n = alphaToNum(input[i]);
    if (n) {
      result.push(numToAlpha (((n-1 + offset) % 26) + 1));
    } else {
      result.push(input[i]);
    }
  }
  return result.join('');
}

// The 1-26 index of the given letter, upper or lower case, or null if nonalpha.
function alphaToNum (input) {
    charNum = input.charCodeAt(0);
    if (charNum >= 65 && charNum <= 90) {
        return charNum - 64;
    } else if (charNum >= 97 && charNum <= 122) {
        return charNum - 96;
    } else {
        return;
    }
}

// Converts 1-26 to alphabetical equivalent.
function numToAlpha (input) {
    if (input >= 1 && input <= 26) {
        return String.fromCharCode(65+input-1);
    } else {
        return;
    }
}

