//takes a text, a bunch of words and
//add an span tag around the matches
function highlight(content, what, spanClass) {
    what = what.replace(/(\r\n|\n|\r)/gm," ").split(' ');
    content = makeSortString(content);
    what.forEach(function(v) {
        v = makeSortString(v);
        content = content.replace(new RegExp(v, 'ig'), '<span>' + v + '</span>');
    });
    return content;
}

//remove special characters from string
var makeSortString = (function() {
    var translate_re = /[áéíóúÁÉÍÓÚ]/g;
    var translate = {
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U" // probably more to come
    };
    return function(s) {
        return (s.replace(translate_re, function(match) {
            return translate[match];
        }));
    }
})();