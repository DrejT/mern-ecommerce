const RedisStore = require("connect-redis").default;
const redisClient = require("./../db/redis.connect");
const session = require("express-session");
require("dotenv").config();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp",
});

const CookieName = "Stoken";
const sessionOptions = {
  secret: process.env.SESSION_ID_SECRET,
  store: redisStore,
  name: CookieName,
  sameSite: "lax",
  cookie: {
    maxAge: 1000 * 86400 * 3,
    httpOnly: false,
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
};
const createSession = session(sessionOptions);

async function authorizeUserSession(req, res, next) {
  try {
    if (!req.session.user) {
      throw createError.Unauthorized("You are unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function revalidateUserSession(req, res, next) {
  try {
    if (req.session.user) {
      return res.status(200).send(req.session.user);
    }
  } catch (error) {
    next(error);
  }
}

async function authorizeAdminSession(req, res, next) {
  try {
    if (!(req.session?.user?.role === "admin")) {
      throw createError.Unauthorized("You are unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
}

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
  authorizeUserSession,
  revalidateUserSession,
  authorizeAdminSession,
};
