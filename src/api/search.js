var AllProducts = require('../helper/allProducts');
var Product = require('../helper/product');
var async = require('async');

var Search = (function() {
    var product = new Product();
    var finalCallback = function(error, products) {};
    var searchText;

    /**
     * Search constructor that accepts the text to look for.
     * @param {string} text 
     */
    function Search(text) {
        searchText = text.toLowerCase();
    }

    /**
     * Final callback function that compiles the data before returning it to the Server module.
     * @param {Object} err Identifies an error object.
     * @param {Object} results If no error occurred, results would be an array of productDetails for all product codes.
     */
    function onAsyncSeriesComplete(err, results) {
        if (err) {
            return finalCallback(err, null);
        }
        if (Array.isArray(results)) {
            var productCodes = [];
            results.forEach(function(element) {
                if (element != null) {
                    var elem = {};
                    if (typeof element === "string") {
                        elem = JSON.parse(element);
                    } else {
                        elem = element;
                    }
                    if (elem.name != null && elem.name.toLowerCase().indexOf(searchText) >= 0) {
                        productCodes.push(elem.itemId);
                    } else if (elem.shortDescription != null && elem.shortDescription.toLowerCase().indexOf(searchText) >= 0) {
                        productCodes.push(elem.itemId);
                    } else if (elem.longDescription != null && elem.longDescription.toLowerCase().indexOf(searchText) >= 0) {
                        productCodes.push(elem.itemId);
                    }
                }
            });
            return finalCallback(null, productCodes);
        }
        return finalCallback(new Error('Invalid results returned'), null);
    }


    /**
     * Start the search with previously setup text.
     * @param {function} callback function(error, products)
     * @param {Object} error error object, if null, products param will be null
     * @param {Object} products array of product codes
     */
    Search.prototype.start = function(callback) {
        var asyncExecutionArray = [];
        if (callback != null) { finalCallback = callback; }
        for (var loopVar = 0; loopVar < AllProducts.length; loopVar++) {
            var productCode = AllProducts[loopVar];
            var getProductDetail = function(prodCode, asyncCallback) {
                product.getProductDetail(prodCode, function(error, productDetail) {
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