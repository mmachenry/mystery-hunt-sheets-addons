// Converts a string to capital letters without whitespace or punctuation, and uppercases.
// "Hello, World!" => "HELLOWORLD"
function normalizeString(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// Returns the nth non-whitespace character of the given string, starting at 1.
// NTH("Hello, world!", 6) => "W"
function nth(text, n) {
  if (n < 1 || n > text.length) return '?'
  return normalizeString(text).slice(n - 1, n);
}

// Returns the number of times a given character appears in a given string.
// countChar("abaab", "a") => 3
function countChar(text, char) {
  var total = 0;
  for (var i = 0; i < text.length; ++i) {
  	if (char === text[i]) ++total;
  }
  return total;
}

// Given two strings, return all characters that appear in the same place in both strings.
// commonChars("ghxxhxh", "ghyyh") => "ghh"
function commonChars(x, y) {
	var ret = [];
	for (var i = 0; i < x.length && i < y.length; ++i) {
		if (x[i] == y[i]) ret.push(x[i]);
	}
	return ret.join("");
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

// The point value of a give word using the given point system.
function wordTilePoints (input, points) {
    var word = normalizeString(input);
    var total = 0;
    for (var i = 0; i < word.length; i++) {
        total += points[alphaToNum(word[i]) - 1];
    }
    return total;
}

// The point value of the given word in Scrabble.
function scrabblePoints (input) {
    var points = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10];
    return wordTilePoints(input, points);
}

// The point value of the given word in Words With Friends.
function wordsWithFriendsPoints (input) {
    var points = [1,4,4,2,1,4,3,3,1,10,5,2,4,2,1,4,10,1,1,1,2,5,4,8,3,10];
    return wordTilePoints(input, points);
}

