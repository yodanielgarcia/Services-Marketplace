'use strict';

async function getStores(client, keys) {
  var stores = new Array();

  for(let i = 0, len = keys.length; i < len; i++) {
    stores[i] = await client.get(keys[i]).then();
  }
  return stores;
}

exports.http = (request, response) => {
  let redis = require('promise-redis')(),
  
      client = redis.createClient({
        port: 16180,
        host: 'redis-16180.c238.us-central1-2.gce.cloud.redislabs.com',
        password: 'Eaf5svuXjw8LBuJuCkrFggGKvhThIM4U',
      });
    
    client.keys('*', async function (err, keys) {
      if (err) {
        throw err;
      } else {
        response.status(200).send(await getStores(client, keys));      
      }
    });  
};

exports.event = (event, callback) => {
  callback();
};
