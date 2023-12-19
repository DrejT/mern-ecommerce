const RedisStore = require("connect-redis").default;
const redisClient = require("./../db/redis.connect");
const session = require("express-session");
require("dotenv").config();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp",
});

const sessionOptions = {
  secret: process.env.SESSION_ID_SECRET,
  store: redisStore,
  name: "Stoken",
  secure: false,
  httpOnly: true,
  sameSite: "none",
  cookie: { maxAge: 1000 * 60 * 60 },
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   secure: false,
  //   httpOnly: true,
  //   // maxAge: 86400 * 3,
  // },
};
const createSession = session(sessionOptions);

async function destroySession(req, res, next) {
  try {
    req.session.destroy();
    res.send("session destroyed");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSession,
  destroySession,
};
