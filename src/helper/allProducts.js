var request = require('request');
var Config = require('./config');
var AllProducts = [];
/**
 * The following request is async so, if AllProducts is used before the request is complete
 * it will be returned as an empty array.
 * This is an acceptable anti-pattern given the execution time of this request and overarching
 * nature of this application.
 */
request(Config.getGitHubUrl(), function(error, response, body) {
    if (error) {
        console.log('An error occurred!');
        console.log('Error : ' + error);
    } else if (response && response.statusCode == 200) {
        var responseData = body;
        var allCodes = responseData.split(",");
        for (var loopVar = 0; loopVar < allCodes.length; loopVar++) {
            var code = allCodes[loopVar];
            if (code != null && (code = code.trim()) != null && code != '') {
                AllProducts.push(code);
            }
        }
    }
    return;
});

module.exports = AllProducts;