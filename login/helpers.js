
var methods = {
    http_request: function(full_url, http_method='get', payload={} ) {
      
        const axios = require('axios')

        return axios.post(full_url, payload).then(response => response.data)

    }
};

module.exports = methods;