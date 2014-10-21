#import 'lib/util.js'

function findPngs(str) {
    return str.match(/(http:)([/|.|\w|\s])*\.(png)/g);
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function findLargestPng(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (endsWith(arr[i], "_1280.png")) {
            return arr[i];
        }
    }
}

function findColorGradient(url) {
    var randomData = request(url);
    var random = toString(randomData);
    var pngs = findPngs(random);
    var png = findLargestPng(pngs);
    return request(png);
}
