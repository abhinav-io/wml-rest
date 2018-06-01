var request = require('request');
var Config = require('./config');
var AllProducts = [];

request(Config.getGitHubUrl(), function(error, response, body) {
    debugger;
    if (error) {
        console.log('An error occurred!');
        console.log('Error : ' + error);
    } else if (response && response.statusCode == 200) {
        var responseData = body;
        var allCodes = responseData.split(",");
        for (var loopVar = 0; loopVar < allCodes.length; loopVar++) {
            var code = allCodes[loopVar];
            if (code != null && code.trim() && code.trim() != '') {
                AllProducts.push(code.trim());
            }
        }
    }
    return;
});

module.exports = AllProducts;