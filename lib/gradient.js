@import 'vendor/index.js'

function setFillFromUrl(url) {
  var loop = [selection objectEnumerator];
  while (layer = [loop nextObject]) {
    var image = extractImageFromUrl(url);
    setImage(layer, image);
  }
}

function extractImageFromUrl(url) {
  var html = request(url);
  var stringifyHtml = toString(html)
  var pngs = parsePngs(stringifyHtml);
  var png = findLargestPng(pngs);
  var data = request(png);
  return NSImage.alloc().initWithData(data);
}

function parsePngs(str) {
  return str.match(/(http:)([/|.|\w|\s])*\.(png)/g);
}

function findLargestPng(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (endsWith(arr[i], '_1280.png')) {
      return arr[i];
    }
  }
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
