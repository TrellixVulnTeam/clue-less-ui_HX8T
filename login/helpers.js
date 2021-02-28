
var methods = {
    http_request: function(host_name, host_port, context_path='/', http_method='GET', payload='' ) {
        // TODO: FIX SO IT RETURNS RESPONSE PROPERLY
        var http = require('http'); 

        var http_options = {
            host: host_name,
            port: host_port,
            path: context_path,
            method: http_method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        callback = function(response) {
          var str = ''
          response.on('data', function (chunk) {
            str += chunk;
          });
        
          response.on('end', function () {
            return str;
          });
        }
        
        if (http_method == 'POST' || http_method == 'PUT' ) {
            var req = http.request(http_options, callback);
            req.write(payload);
            var response_body = req.end().body;
        } else {
            var response_body = http.request(http_options, callback).body;
        }

        return response_body
    }
};

module.exports = methods;