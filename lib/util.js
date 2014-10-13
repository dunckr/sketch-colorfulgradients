function request(url) {
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return response;
}

function toString(response) {
    return NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);
}

function setImage(layer, data) {
    var image = NSImage.alloc().initWithData(data);
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternImage(image);
    fill.setPatternFillType(1);
}

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

function setFillWithUrl(url) {
    var loop = [selection objectEnumerator]
    while (layer = [loop nextObject]) {
        var data = findColorGradient(url);
        setImage(layer, data);
    }
}
