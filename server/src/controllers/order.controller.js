const OrderModel = require("./../models/order.model");
// const UserModel = require("./../models/user.model");

async function orderCreate(req, res, next) {
  try {
    const order = new OrderModel({
      for: req.result.for,
      by: req.result.by,
      state: req.result.state,
      city: req.result.city,
      pincode: req.result.pincode,
      address1: req.result.address1,
      address2: req.result.address2,
    });
    if (!order) {
      return res.status(500).send("internal server error");
    }
    await order.save();
    res.status(200).send("order created successfully");
  } catch (error) {
    next(error);
  }
}

async function orderGet(req, res, next) {
  try {
    console.log("result", req.result);
    const orders = await OrderModel.find({ by: req.result }).populate("for");
    console.log("orders", orders);
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  orderCreate,
  orderGet,
};
