require("dotenv").config();
require("./src/db/mongo.connect");
// require("./src/db/redis.db");
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const passport = require("passport");

const authRouter = require("./src/routes/user.route");
require("./src/middlewares/user.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.get(
  "/proc",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    res.status(200).send({
      success: true,
      message: "authenticated the request",
      extractedUserid: req.user,
    });
  }
);

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
