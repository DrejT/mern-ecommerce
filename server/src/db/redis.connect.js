require("dotenv").config();
const Redis = require("ioredis");

const client = new Redis(
  `rediss://default:${process.env.REDIS_PASSWORD}@eu2-tops-quagga-31391.upstash.io:31391`
);

client
  .on("connect", () => console.log("redis connected"))
  .on("ready", () => console.log("redis is now ready"))
  .on("reconnecting", () => console.log("reconnecting redis"))
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("end", () => console.log("redis has stopped"));

module.exports = client;
