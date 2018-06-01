var AllProducts = require('../helper/allProducts');
var Product = require('../helper/product');
var async = require('async');

var Search = (function() {
    var product = new Product();
    var finalCallback = function(error, products) {};
    var searchText;

    function Search(text) {
        searchText = text.toLocaleLowerCase();
    }

    function onAsyncSeriesComplete(err, results) {

        if (err) {
            return finalCallback(err, null);
        }
        if (Array.isArray(results)) {
            var productCodes = [];
            results.forEach(function(element) {
                var elementText = JSON.stringify(element).toLocaleLowerCase();
                if (elementText.indexOf(searchText) >= 0) {
                    productCodes.push(element.itemId);
                }
            });
            return finalCallback(null, productCodes);
        }
        finalCallback(new Error('Invalid results returned'), null);
    }


    Search.prototype.start = function(callback) {
        var asyncExecutionArray = [];
        if (callback !== void 0) { finalCallback = callback; }
        debugger;
        for (var loopVar = 0; loopVar < AllProducts.length; loopVar++) {
            var productCode = AllProducts[loopVar];
            console.log("Step 1: " + productCode);
            var getProductDetail = function(asyncCallback) {
                product.getProductDetail(productCode, function(error, productDetail) {
                    if (error != null) {
                        return asyncCallback(error, null);
                    }
                    return asyncCallback(null, productDetail);
                });
            };
            asyncExecutionArray.push(getProductDetail);
        }
        async.series(asyncExecutionArray, onAsyncSeriesComplete);
    };
    return Search;
}());

module.exports = Search;