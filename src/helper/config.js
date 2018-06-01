var Config = {
    getGitHubUrl: function() {
        return 'https://gist.githubusercontent.com/daniyalzade/f7e0d469be9b8a132f9b/raw/14aae44d0b61056dac60def9cf614863fdb4e978/items.csv';
    },
    getProductCodeUrl: function(productCode) {
        if (productCode == null) {
            throw new Error('productCode is null');
        } else if (typeof productCode === "string" && (productCode = productCode.trim()) === '') {
            throw new Error('productCode is an invalid string');
        } else if (Number.isInteger(productCode) && productCode < 1) {
            throw new Error('productCode is an invalid number');
        }
        return 'http://api.walmartlabs.com/v1/items/' + productCode + '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj';
    }
};

module.exports = Config;