
var methods = {
    http_request: function(full_url, http_method='get', payload={} ) {

      // TRYING AXIOS
        const axios = require('axios')

        return axios.post(full_url, payload).then(response => response.data)
        
        // let res = null;

        // if (http_method == 'get') {
        //   res = await axios.get(full_url);
        // } else if (http_method == 'post') {
        //   res = await axios.post(full_url, payload);
        // } else if (http_method == 'put') {
        //   res = await axios.put(full_url, payload);
        // } else if (http_method == 'delete') {
        //   res = await axios.delete(full_url, payload);
        // }


        // try {
        //   const {data:response} = await axios.post(full_url, payload) //use data destructuring to get data from the promise object
        //   return response
        // } catch (error) {
        //   console.log(error);
        // }

    }
};

module.exports = methods;