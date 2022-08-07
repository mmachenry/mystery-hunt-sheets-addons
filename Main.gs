// When adding a new function, don't forget to update the reference tab!
// Last updated 2021-01-20 from https://github.com/mmachenry/mystery-hunt-sheets-addons/blob/master/Main.gs

/**
 * Split a string on regexp match. 
 * 
 * @param {string} str - input to split
 * @param {string} re - regular expression to split on
 * @return an array of the matching substrings
 * @customfunction
 */
function regexSplit(str, re) {
  var r = new RegExp(re, "g")
  return str.split(r)
}

/**
 * Given a string, return a cell block with its letters along the diagonal
 * 
 * @param {string} str - input string
 * @return a block of cells with the input characters along the diagonal
 * @customfunction
 */

function diagonalize(str) {
  var res = [];
  var letters = str.split("");
  for (var i=0; i < str.length; i++) {
    var line = [];
    line[i] = letters[i];
    res.push(line);
  }

  return res;
}

/**
 * Take a range and convert it into a column of concatenated rows
 * 
 * @param {string} vals - selection of cells to concatenate e.g. A1:C5
 * @return a row of cells with the values from the input selection
 * @customfunction
 */
function linearize(vals) {
  var res = [];
  for (var y=0; y < vals.length; y++) {
    for (var x=0; x < vals[y].length; x++) {
      res.push([vals[y][x]]);
    }
  }

  return res;
}

/**
 * Converts a string to capital letters without whitespace or punctuation, and uppercases.
 * e.g. "Hello, World!" => "HELLOWORLD"
 * 
 * @param {string} text - input text to normalize
 * @return normalized text
 * @customfunction
 */
function normalizeString(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

/**
 * Returns the nth non-whitespace character of the given string, starting at 1.
 * 
 * NTH("Hello, world!", 6) => "W"
 * nth("abcd", 2, 4) => "BD"
 * 
 * @param {string} text - input text
 * @param {...number} n - one or more positions to return
 * @return string containing the letters from the specified positions
 * @customfunction
 */
function nth(text, n) {
  text = normalizeString(text);
  var characters = '';
  for (var i = 1; i < arguments.length; ++i) {
    var n = arguments[i];
    if (n < 1 || n > text.length) {
      characters += '?';
    } else {
      characters += text[n-1];
    }
  }
  return characters;
}

/**
 * Returns the number of times a given character appears in a given string.
 * 
 * countChar("abaab", "a") => 3
 * 
 * @param {string} text - input text
 * @param {string} char - character to count
 * @return number of times the character was found
 * @customfunction
 */
function countChar(text, char) {
  var total = 0;
  for (var i = 0; i < text.length; ++i) {
  	if (char === text[i]) ++total;
  }
  return total;
}

/**
 * Given two strings, return all characters that appear in the same place in both strings.
 * 
 * commonChars("ghxxhxh", "ghyyh") => "ghh"
 * 
 * @param {string} x - first string to examine
 * @param {string} y - second string to examine
 * @return string containing common characters
 * @customfunction
 */
function commonChars(x, y) {
	var ret = [];
	for (var i = 0; i < x.length && i < y.length; ++i) {
		if (x[i] == y[i]) ret.push(x[i]);
	}
	return ret.join("");
}

/** Returns the Caesar shifted string, ignoring non alphabetic letters.
 * 
 * @param {number} offset
 * @param {string} input
 * @return shifted string
 * @customfunction
 */
function caesarShift (offset, input) {
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

/** The 1-26 index of the given letter, upper or lower case, or null if nonalpha.
 * 
 * @param {string} input - single letter
 * @return 1-26 for A-Z or a-z, null otherwise
 * @customfunction
 */
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

/** Converts 1-26 to alphabetical equivalent.
 * 
 * @param {number} input - number 1-26
 * @return the numbered letter
 * @customfunction
 */
function numToAlpha (input) {
    if (input >= 1 && input <= 26) {
        return String.fromCharCode(65+input-1);
    } else {
        return;
    }
}

/**
 * Converts binary number 1-26 to alphabetical equivalent.
 * 
 * @param {number} Binary number from 1-26.
 * @return The numbered letter.
 * @customfunction
 */
function binaryNumToAlpha(number) {
  return numToAlpha(parseInt(number, 2));
}

/** The point value of a give word using the given point system.
 * 
 * @param {string} input - word to score
 * @param {map} points - map of letter to value
 * @return total value
 */
function wordTilePoints (input, points) {
    var word = normalizeString(input);
    var total = 0;
    for (var i = 0; i < word.length; i++) {
        total += points[alphaToNum(word[i]) - 1];
    }
    return total;
}

/** The point value of the given word in Scrabble.
 * 
 * @param {string} input - word to score
 * @return value of the word
 * @customfunction
 */
function scrabblePoints (input) {
    var points = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10];
    return wordTilePoints(input, points);
}

/** The point value of the given word in Words With Friends.
 * 
 * @param {string} input - word to score
 * @return value of the word
 * @customfunction
 */
function wordsWithFriendsPoints (input) {
    var points = [1,4,4,2,1,4,3,3,1,10,5,2,4,2,1,4,10,1,1,1,2,5,4,8,3,10];
    return wordTilePoints(input, points);
}

/** Reverse the given string
 * 
 * @param {string} str - string to reverse
 * @return reversed string
 * @customfunction
 */
function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

/** Split a string into individual letters
 * 
 * @param {string} str - input string
 * @return row of cells containing the individual letters
 * @customfunction
 */
function splitString(str) {
  return [str.split("")];
}

/** The unique characters of the given string.
 * 
 * @param {string} text - input string
 * @return string made of the unique letters in the input
 * @customfunction
 */
function uniqueChars(text) {
    var unique= "";
    for(var i = 0; i < text.length; i++) {
        if(unique.indexOf(text.charAt(i)) < 0) {
            unique += text.charAt(i);
        }
    }
    return unique;
}

/**
 * Looks up text in wikipedia page infobox table.
 *
 * @param {text} The wikipedia page to look up, either a Wikipedia url or a title.
 * @param {text} The key to look up e.g. "Born" for birth date.
 * @return The Wikipedia infobox info for a specific key.
 * @customfunction
 */
function wikiLookup(wpUrl, key) {
  //wpUrl = 'George Washington';
  //key = 'born';
  //returns 1732
  
  if (wpUrl.slice(0,4) !== 'http') {
    wpUrl = wikiUrl(wpUrl)
  }
  
  var cache = CacheService.getScriptCache();
  var wpPage = cache.get(wpUrl);
  if (!wpPage) {
    wpPage = UrlFetchApp.fetch(wpUrl).getContentText();
    try {
     cache.put(wpUrl, wpPage);
    } catch(e) {}
  }
  
  var document = XmlService.parse(wpPage);
  var elements = document.getRootElement().getDescendants();
  var infoBoxTable = elements.filter(function(element) { 
    return element.getName &&
      element.getName() === 'table' &&
      element.getAttribute('class') &&
      element.getAttribute('class').getValue().indexOf('infobox') > -1; 
  })[0];
  
  if (!(infoBoxTable && infoBoxTable.getDescendants)) { return "No infobox found for page: "+wpUrl; }
  
  // look for exact key
  var tableElements = infoBoxTable.getDescendants();
  for (var i=0; i < tableElements.length; ++i) {
    var element = tableElements[i];
    if (element.getName && element.getName() === 'th') {
      if (element.getValue().toLowerCase().trim() === key.toLowerCase().trim()) {  
        var j = 1;   
        // find the next <td> element, since text nodes and actual html nodes are interspersed
        while (!(tableElements[i+j].getName && tableElements[i+j].getName() === 'td')) {
          j += 1; 
        }
        return tableElements[i+j].getValue();
      }
    }
  }
  
  // if exact key not found, look for a cell that contains `key`
  var tableElements = infoBoxTable.getDescendants();
  for (var i=0; i < tableElements.length; ++i) {
    var element = tableElements[i];
    if (element.getName && element.getName() === 'th') {
      if (element.getValue().toLowerCase().trim().indexOf(key.toLowerCase().trim()) > -1) {  
        var j = 1;   
        // find the next <td> element, since text nodes and actual html nodes are interspersed
        while (!(tableElements[i+j].getName && tableElements[i+j].getName() === 'td')) {
          j += 1; 
        }
        return tableElements[i+j].getValue();
      }
    }
  }
  
  return "Key '"+key+"' not found in infobox for page: "+wpUrl;
}

/**
 * Get the wikipedia url for some text.
 *
 * @param {text} The text to turn into a wikipedia url.
 * @return A special Wikipedia URL that may or may not be right.
 * @customfunction
 */
function wikiUrl(str) {
  str = str.replace(/\s/g,'+')
  return 'https://en.wikipedia.org/w/index.php?title=Special:Search&search='+str;
}

/**
 * Get the nutrimatic url for a query.
 *
 * @param {text} The text to turn into a nutrimatic url.
 * @return A link to the Nutrimatic.org results for this query.
 * @customfunction
 */
function nutrimatic(query) {
  query = encodeURIComponent(query);
  return 'https://nutrimatic.org/?q='+query+'&go=Go';
}

/**
 * Find the intersection of two sets.
 * 
 * @param {Array<Array<number>>} setA
 * @param {Array<Array<number>>} setB
 * @return list of cells that exist in both sets
 * @customfunction
 */
function intersection(setA, setB) {
  var common = new Map();
  var res = [];
  setA.map(row => row.map(cell => common.set(cell)));
  setB.map(row => row.map(cell => {if (common.has(cell)) { res.push(cell)}}));
  return res;
}

/**
 * Find the difference between two sets.
 * 
 * @param {Array<Array<number>>} setA
 * @param {Array<Array<number>>} setB
 * @return list of cells that don't exist in both sets
 * @customfunction
 */
function difference(setA, setB) {
  var common = new Map();
  setA.map(row => row.map(cell => common.set(cell, 1)));
  setB.map(row => row.map(cell => {if (common.has(cell)) {common.set(cell, 2)} else {common.set(cell, 1)}}));
  var res = [];
  common.forEach((v,k) => {if (v==1) {res.push(k)}})
  return res;
}
