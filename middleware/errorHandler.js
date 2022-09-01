const AppError = require("../AppError");

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
    });
  }

  return res.status(500).send("Something went wrong");
};

module.exports = errorHandler;
