const ReviewModel = require("./../models/review.model");

async function getReview(req, res, next) {
  try {
    const review = await ReviewModel.findById(req.result);
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const review = new ReviewModel(req.result);
    // if (!review) {
    //   return res.status(404).send("review not found");
    // }
    await review.save();
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function editReview(req, res, next) {
  try {
    const review = await ReviewModel.findByIdAndUpdate(
      { _id: req.result.id },
      req.result.data,
      { new: true }
    );
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    console.log(req.result);
    const review = await ReviewModel.deleteOne({ _id: req.result });
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getReview,
  createReview,
  editReview,
  deleteReview,
};
