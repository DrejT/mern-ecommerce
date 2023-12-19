const redis = require("redis");

const client = redis.createClient();

(async () => {
  await client
  .on('connect', () => console.log("redis connected"))
  .on('ready', () => console.log("redis is now ready"))
  .on('reconnecting', () => console.log("reconnecting redis"))
  .on('error', err => console.log('Redis Client Error', err))
  .on('end', () => console.log("redis has stopped"))
  .connect();
})();


module.exports = client;
