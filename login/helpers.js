
var methods = {
    http_request: function(host_name, host_port, context_path='/', http_method='GET', payload='' ) {
        var http = require("http");

        var options = {
            host: host_name,
            port: host_port,
            path: context_path,
            method: http_method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // TODO: FIX SO IT RETURNS RESPONSE PROPERLY
        callback = function(response) {
          res_body = '';
          response.on('data', function (chunk) {
            res_body += chunk;
          });
          response.on('end', function () {
            return(res_body);
          });
        }
        
        var body = http.request(options, callback).end();
        console.log(body);
    }
};

module.exports = methods;