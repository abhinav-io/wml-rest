var Search = (function() {
    function Search(text) {
        this.text = text;
    }
    Search.prototype.start = function(onSuccess, onError) {
        if (onSuccess === void 0) { onSuccess = function(products) {}; }
        if (onError === void 0) { onError = function() {}; }
        // do some stuff here
    };
    return Search;
}());

module.exports = Search;

var server = new Search("backpack");
server.start();