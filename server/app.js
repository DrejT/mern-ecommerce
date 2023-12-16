require("dotenv").config();
require("./src/db/mongo.connect");
// require("./src/db/redis.db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const authRouter = require("./src/routes/auth.route");
const adminRouter = require("./src/routes/admin.route")
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_ID_SECRET,
  credentials: true,
  name: "Stoken",
  secure: false,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    // maxAge: 86400 * 3,
  },
};
const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  credentials: true,
};
app.use(helmet())
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.use("/admin", adminRouter)
app.use("/auth", authRouter);


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
