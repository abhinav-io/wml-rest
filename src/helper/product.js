var request = require('request');
var Config = require('./config');

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

    Product.prototype.getProductDetail = function(productCode, callback) {
        console.log("Product.getProductDetail.productCode : " + productCode);
        if (callback === void 0) {
            callback = function(err, productDetail) {};
        }
        /***
         * Added settimeout to stop network thrashing.
         * Despite running the requests serially with async, store service server was still blocking the requests.
         * 400 was the most apt number
         */
        var timeout = 400 + Math.floor(Math.random() * 200) + 1;
        console.log("timeout: " + timeout);
        setTimeout(() => {
            request(Config.getProductCodeUrl(productCode), function(error, response, body) {
                console.log("Requesting data for : " + productCode);
                if (error) {
                    console.log('An error occurred!');
                    console.log('Error : ' + error);
                    return callback(error, null);
                } else if (response && response.statusCode == 200) {
                    console.log("Got data for : " + productCode);
                    return callback(null, body);
                }
                return;
            });
        }, timeout);

    };
    return Product;
}());

module.exports = Product;