const rp = require('request-promise');

function request(ctx, options){
    return rp(options);
}

module.exports = request;