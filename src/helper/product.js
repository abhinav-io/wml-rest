var request = require('request');
var Config = require('./config');

var Product = (function() {
    function Product() {}

    Product.prototype.getProductDetail = function(productCode, callback) {
        console.log("Product.getProductDetail.productCode : " + productCode);
        if (callback === void 0) {
            callback = function(err, productDetail) {};
        }
        request(Config.getProductCodeUrl(productCode), function(error, response, body) {
            if (error) {
                console.log('An error occurred!');
                console.log('Error : ' + error);
                return callback(error, null);
            } else if (response && response.statusCode == 200) {
                return callback(null, body);
            }
            return;
        });
    };
    return Product;
}());

module.exports = Product;