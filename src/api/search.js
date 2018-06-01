var AllProducts = require('../helper/allProducts');
var Product = require('../helper/product');
var async = require('async');

var Search = (function() {
    var product = new Product();
    var finalCallback = function(error, products) {};
    var searchText;

    function Search(text) {
        searchText = text.toLowerCase();
    }

    function onAsyncSeriesComplete(err, results) {

        if (err) {
            return finalCallback(err, null);
        }
        if (Array.isArray(results)) {
            var productCodes = [];
            results.forEach(function(element) {
                var elementText = "";
                var elem = {};
                if (typeof element === "string") {
                    elem = JSON.parse(element);
                    elementText = element.toLowerCase();
                } else {
                    elem = element;
                    elementText = JSON.stringify(element).toLowerCase();
                }
                if (elementText.indexOf(searchText) >= 0) {
                    productCodes.push(elem.itemId);
                }
            });
            return finalCallback(null, productCodes);
        }
        return finalCallback(new Error('Invalid results returned'), null);
    }


    Search.prototype.start = function(callback) {
        var asyncExecutionArray = [];
        if (callback !== void 0) { finalCallback = callback; }
        for (var loopVar = 0; loopVar < AllProducts.length; loopVar++) {
            var productCode = AllProducts[loopVar];
            console.log("Step 1: " + productCode);
            var getProductDetail = function(productCode, asyncCallback) {
                product.getProductDetail(productCode, function(error, productDetail) {
                    if (error != null) {
                        return asyncCallback(error, null);
                    }
                    return asyncCallback(null, productDetail);
                });
            };
            asyncExecutionArray.push(async.apply(getProductDetail, productCode));
        }
        async.series(asyncExecutionArray, onAsyncSeriesComplete);
    };
    return Search;
}());

module.exports = Search;