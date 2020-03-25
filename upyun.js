const upyun = require('upyun');

function getSignHeader(bucket, method, path, contentMD5) {
    return Promise.resolve(upyun.sign.getHeaderSign(bucket, method, path, contentMD5));
}

async function createClient(client, service) {
    return await Promise.resolve(new client({
      serviceName: service
    }, getSignHeader));
}

module.exports = {
    createClient
}
