var request = require('request');
var Config = require('./config');
var ProductsCache = require('./productCache');

var Product = (function() {

    /**
     * Helper unit for looking up a Product when a product code is given.
     * Example:
     * var product = new Product();
     * product.start("12662817", (err, productDetails) => {
     *   if(err){
     *     --do something with error
     *     return;
     *   }
     *   --do something with productDetails
     * });
     * @constructor
     */
    function Product() {}

    /**
     * Get details for a given product code.
     * @param {string|number} productCode product code to pull data for
     * @param {function} callback function(err, productDetail)
     */
    Product.prototype.getProductDetail = function(productCode, callback) {
        // console.log("Product.getProductDetail.productCode : " + productCode);
        if (callback == null) {
            callback = function(err, productDetail) {};
        }

        if (ProductsCache[productCode]) {
            return callback(null, ProductsCache[productCode]);
        }
        /***
         * Added settimeout to stop network thrashing.
         * Despite running the requests serially with async, store service server was still blocking the requests.
         * 400+ seemed like an apt delay
         */
        var timeout = 400 + Math.floor(Math.random() * 200) + 1;
        setTimeout(function() {
            request(Config.getProductCodeUrl(productCode), function(error, response, body) {
                if (error) {
                    // console.log('An error occurred!');
                    // console.log('Error : ' + JSON.stringify(error));
                    return callback(error, null);
                } else if (response && response.statusCode == 200) {
                    // console.log("Got data for : " + productCode);
                    ProductsCache[productCode] = body;
                    return callback(null, body);
                }
                var err = {
                    'statusCode': response.statusCode,
                    'body': body
                };
                return callback(err, null);
            });
        }, timeout);

    };
    return Product;
}());

module.exports = Product;