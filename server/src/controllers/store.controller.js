const StoreModel = require("./../models/store.model");
const createError = require("http-errors");

async function getStore(req, res, next) {
  try {
    const store = await StoreModel.findOne({ name: req.result });
    console.log(store, req.result);
    res.send("store sent");
  } catch (error) {
    next(error);
  }
}

async function createStore(req, res, next) {
  try {
    const newStore = new StoreModel({
      name: req.result.name,
      businessEmail: req.result.businessEmail,
      description: req.result.description,
    });
    await newStore.save();
    res.status(200).send({ newStore });
  } catch (error) {
    next(error);
  }
}

async function editStore(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function removeStore(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getStore,
  createStore,
  editStore,
  removeStore,
};
