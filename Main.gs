// When adding a new function, don't forget to update the reference tab!
// Repo: https://github.com/mmachenry/mystery-hunt-sheets-addons/blob/master/Main.gs
// Last pulled: <TBD>

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

/**
 * Converts binary ASCII/Unicode code to its corresponding character.
 * 
 * @param {number} Binary number representing an ASCII/Unicode code.
 * @return The corresponding character.
 * @customfunction
 */
function binaryCodeToChar(number) {
  return String.fromCodePoint(parseInt(number, 2));
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

/** Sort the characters in a string
 * 
 * @param {string} str - input string
 * @return sorted string
 * @customfunction
 */
function sortString(str) {
  return str.split("").sort().join("");
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
 * Get the Qat url for a query.
 *
 * @param {string} query The text to turn into a Qat url.
 * @param {string} dictionary Which dictionary to use. Case insensitive. Defaults to UKACD.
 * @return A link to the Qat results for this query.
 * @customfunction
 */
function qat(query, dictionary="UKACD") {
  dictionary = dictionary.toUpperCase();
  const dictionaries = ["UKACD", "YAWL", "ABLE", "MOBY", "PDL", "BNC", "UNION"];

  // Select the dictionary. If the dictionary is invalid, defaults to UKACD.
  dictionaryNum = 0;
  for (var i = 0; i < dictionaries.length; ++i) {
    if (dictionary == dictionaries[i]) {
      dictionaryNum = i;
      break;
    }
  }

  query = encodeURIComponent(query);
  return 'https://www.quinapalus.com/cgi-bin/qat?pat='+query+'&ent=Search&dict='+dictionaryNum;
}

/**
 * Get the OneLook url for a query.
 *
 * @param {string} query The text to turn into a OneLook url.
 * @return A link to the OneLook.com results for this query.
 * @customfunction
 */
function onelook(query) {
  query = encodeURIComponent(query);
  return 'https://www.onelook.com/?w='+query+'&ssbp=1';
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

/**
 * Takes pairs of cardinal directions, return semaphore flag values.
 * 
 * @param {Array<Array<string>>} dirs - direction pairs
 * @returns parsed values
 * @customfunction
 */
function semaphore(dirs) {
  const alphaMap = new Map();
  const numMap = new Map();
  const defs = [
    ["S","SE","A", "1"],
    ["S","E","B", "2"],
    ["S","NE","C", "3"],
    ["S","N","D", "4"],
    ["N","S","D", "4"],
    ["NW","S","E", "5"],
    ["W","S","F", "6"],
    ["SW","S","G", "7"],
    ["SE","E","H", "8"],
    ["SE","N","I", "9"],
    ["W","N","J", "<alphabetic>"],
    ["N","SE","K", "0"],
    ["NW","SE","L"],
    ["W","SE","M"],
    ["SW","SE","N"],
    ["NE","E","O"],
    ["N","E","P"],
    ["NW","E","Q"],
    ["W","E","R"],
    ["SW","E","S"],
    ["N","NE","T"],
    ["NW","NE","U"],
    ["SW","N","V"],
    ["W","NW","W"],
    ["SW","NW","X"],
    ["W","NE","Y"],
    ["W","SW","Z"],
    ["NW","N","<Numerical sign>"],
    ["SW","NE","<Annul sign>"],
  ];
  
  defs.forEach((d) => {
    alphaMap.set(d[0]+"-"+d[1], d[2]);
    alphaMap.set(d[1]+"-"+d[0], d[2]);
    if (d[3]) {
      numMap.set(d[0]+"-"+d[1], d[3]);
      numMap.set(d[1]+"-"+d[0], d[3]);
    }
  })

  var res = [];
  var mode = "alpha";
  dirs.forEach((d) => {
    var k = d[0]+"-"+d[1];
    if (mode == "alpha") {
      if (alphaMap.has(k)) {
        var v = alphaMap.get(k);
        res.push(v);
        if (v == "<Numerical sign>") {
          mode = "numeric";
        }        
      } else {
        res.push("?");
      }
    } else {
      if (numMap.has(k)) {
        var v = numMap.get(k);
        res.push(v);
        mode = "alpha";
      } else {
        res.push("?");
      }
    }
  });

  return res;
}

/**
 * Translates a morse code string.
 * 
 * @param {string} str The string to be translated. If the string contains
 multiple codes, they will be split by any sequence of non-dot or non-dash
 characters.
 * @return The translated string, with ? replacing unknown codes.
 * @customfunction
 */
function morse(str) {
  const charMap = new Map();
  const defs = [
    [".-", "A"],
    ["-...", "B"],
    ["-.-.", "C"],
    ["-..", "D"],
    [".", "E"],
    ["..-.", "F"],
    ["--.", "G"],
    ["....", "H"],
    ["..", "I"],
    [".---", "J"],
    ["-.-", "K"],
    [".-..", "L"],
    ["--", "M"],
    ["-.", "N"],
    ["---", "O"],
    [".--.", "P"],
    ["--.-", "Q"],
    [".-.", "R"],
    ["...", "S"],
    ["-", "T"],
    ["..-", "U"],
    ["...-", "V"],
    [".--", "W"],
    ["-..-", "X"],
    ["-.--", "Y"],
    ["--..", "Z"],
    [".----", "1"],
    ["..---", "2"],
    ["...--", "3"],
    ["....-", "4"],
    [".....", "5"],
    ["-....", "6"],
    ["--...", "7"],
    ["---..", "8"],
    ["----.", "9"],
    ["-----", "0"]
  ];

  // Fill out charMap with our code to character assignment
  defs.forEach((d) => {
    charMap.set(d[0], d[1]);
  });

  // Replace each code with the corresponding character
  var morseCharacters = str.split(/[^.-]+/g);
  var characters = morseCharacters.map((c) => {
    if (charMap.has(c)) {
      return charMap.get(c);
    }
    // Due to how str.split works, first and last character may be empty,
    // don't add question mark in those cases
    else if (!c) {
      return "";
    }
    // Add question mark for any codes that are unknown
    else {
      return "?";
    }
  });

  return characters.join("");
}

/** 
 * Returns the URL contained in a hyperlinked cell. Supports ranges.
 * 
 * @param {string}
 * @return URL from the given link
 * @customfunction
 * 
 * from https://stackoverflow.com/questions/35230764/how-to-extract-url-from-link-in-google-sheets-using-a-formula
 */
function linkURL(reference) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var formula = SpreadsheetApp.getActiveRange().getFormula();
  var args = formula.match(/=\w+\((.*)\)/i);
  try {
    var range = sheet.getRange(args[1]);
  }
  catch(e) {
    throw new Error(args[1] + ' is not a valid range');
  }

  var formulas = range.getRichTextValues();
  var output = [];
  for (var i = 0; i < formulas.length; i++) {
    var row = [];
    for (var j = 0; j < formulas[0].length; j++) {
      row.push(formulas[i][j].getLinkUrl());
    }
    output.push(row);
  }
  return output
}
