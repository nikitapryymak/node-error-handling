const express = require("express");
const Joi = require("joi");
const AppError = require("./AppError");
const { INVALID_SUBSCRIPTION } = require("./constants/errorCodes");
const errorHandler = require("./middleware/errorHandler");
const { tryCatch } = require("./utils/tryCatch");

const app = express();

const getUser = () => undefined;
const getSubscription = () => undefined;

app.get(
  "/test",
  tryCatch(async (req, res) => {
    const user = getUser();
    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({ success: true });
  })
);

const schema = Joi.object({
  userId: Joi.number().required(),
});

app.post(
  "/login",
  tryCatch(async (req, res) => {
    const { error, value } = schema.validate({});
    // if (error) throw error;
    const subscription = getSubscription();
    if (!subscription) {
      throw new AppError(INVALID_SUBSCRIPTION, "Subscription not found", 400);
    }
  })
);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
