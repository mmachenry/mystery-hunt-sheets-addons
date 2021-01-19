// When adding a new function, don't forget to update the reference tab!

// Given a string, return a cell block with its letters along the diagonal
function diagonalize(str) {
  var res = []
  var letters = str.split("")
  for (var i=0; i < str.length; i++) {
    var line = []
    line[i] = letters[i]
    res.push(line)
  }

  return res
}

// Take a range and convert it into a column of concatenated rows
function linearize(vals) {
  var res = [];
  for (var y=0; y < vals.length; y++) {
    for (var x=0; x < vals[y].length; x++) {
      res.push([vals[y][x]]);
    }
  }

  return res;
}

// Converts a string to capital letters without whitespace or punctuation, and uppercases.
// "Hello, World!" => "HELLOWORLD"
function normalizeString(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// Returns the nth non-whitespace character of the given string, starting at 1.
// NTH("Hello, world!", 6) => "W"
// nth("abcd", 2, 4) => "BD"
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

// Reverse the given string
function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

// The unique characters of the given string.
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
