const {
  registerAuthSchema,
  loginAuthSchema,
} = require("./../utils/validateschema");
const UserModel = require("./../models/user.model");
const createError = require("http-errors");

// middleware for validating all the requests coming routes under /auth/admin/*
// authRouter.use(async function (req, res, next) {
//   try {
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

async function validateRegisterSchema(req, res, next) {
  try {
    const result = await registerAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function validateLoginSchema(req, res, next) {
  try {
    const result = await loginAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

async function fetchLogin(req, res, next) {
  try {
    const user = await UserModel.findOne({ username: req.result.username });
    if (!user) {
      throw createError.NotFound("user is not registered");
    }
    const validPassword = await user.isPasswordValid(req.result.password);
    if (!validPassword) {
      throw createError.Unauthorized("username or password not valid");
    }
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      stores: user.stores,
    };
    req.session.message = "login successful";
    next();
  } catch (error) {
    next(error);
  }
}

async function filterLogin(req, res, next) {
  try {
    delete req.session.user.password;
    next();
  } catch (error) {
    next(error);
  }
}

async function sendLogin(req, res, next) {
  try {
    res.status(200).send(req.session);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
  fetchLogin,
  filterLogin,
  sendLogin,
};
