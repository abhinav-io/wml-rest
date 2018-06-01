var Product = (function() {
    function Product() {}
    Product.prototype.init = function(onSuccess, onError) {
        if (onSuccess === void 0) { onSuccess = function() {}; }
        if (onError === void 0) { onError = function() {}; }
        // do some stuff here
        this.all = "";
        if (true) {
            onSuccess();
        } else {
            onError();
        }
    };
    Product.prototype.getProductDetail = function(productCode, onSuccess, onError) {
        if (onSuccess === void 0) { onSuccess = function() {}; }
        if (onError === void 0) { onError = function() {}; }
    };
    return Product;
}());

module.exports = Product;