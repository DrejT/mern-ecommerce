require("dotenv").config();
require("./src/db/mongo.connect");
const redisClient = require("./src/db/redis.connect");
// require("./src/db/redis.db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const morgan = require("morgan");
// const passport = require("passport");
// const session = require("express-session");
require("./src/db/redis.connect");
// const RedisStore = require("connect-redis").default;

const authRouter = require("./src/routes/auth.route");
const adminRouter = require("./src/routes/admin.route");
const storeRouter = require("./src/routes/store.route");
// const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

// const redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "myapp",
// });

// const sessionOptions = {
//   secret: process.env.SESSION_ID_SECRET,
//   store: redisStore,
//   name: "Stoken",
//   secure: false,
//   httpOnly: true,
//   sameSite: "none",
//   cookie: { maxAge: 1000 * 60 * 60 },
//   resave: false,
//   saveUninitialized: false,
//   // cookie: {
//   //   secure: false,
//   //   httpOnly: true,
//   //   // maxAge: 86400 * 3,
//   // },
// };
const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  credentials: true,
};
app.use(helmet());
// app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/admin/store", storeRouter);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () =>
  console.log(`server started on ${process.env.PORT}`)
);
