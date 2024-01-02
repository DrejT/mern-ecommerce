const StoreModel = require("../models/store.model");
const ItemModel = require("./../models/item.model");

async function createItem(req, res, next) {
  try {
    const store = await StoreModel.findById(req.result.storeId);
    if (!store) {
      return res.status(404).send("store not found");
    }
    const newItem = new ItemModel({
      name: req.result.name,
      storeId: req.result.storeId,
      description: req.result.description,
      imageUrl: req.result.imageUrl,
      sale: req.result.sale,
      price: req.result.price,
      amount: req.result.amount,
      onShelf: req.result.onShelf,
    });
    const item = await newItem.save();
    store.items.push(item);
    await store.save();
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
}

async function getItem(req, res, next) {
  try {
    const item = await ItemModel.findById(req.result);
    if (!item) {
      return res.status(404).send("item not found");
    }
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
}

async function getAllItem(req, res, next) {
  try {
    const items = await ItemModel.find({
      storeId: { $in: req.result },
    });
    if (!items) {
      return res.status(404).send("no items found");
    }
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
}

async function editItem(req, res, next) {
  try {
    const item = await ItemModel.findOneAndUpdate(
      { _id: req.result.id },
      req.result.data,
      { new: true }
    );
    if (!item) {
      return res.status(404).send("item not found");
    }

    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const item = await ItemModel.deleteOne({ _id: req.result });
    if (!item) {
      return res.status(404).send("item not found");
    }

    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getItem,
  getAllItem,
  createItem,
  editItem,
  deleteItem,
};
