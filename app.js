const cors = require("cors");
const express = require("express");
const compression = require("compression");

const helmet = require("helmet");

const httpStatus = require("http-status");
const morgan = require("./config/morgan");
const config = require("./config/config");
const ApiError = require("./utils/apiError");
const { errorConverter, errorHandler } = require("./middlewares/error");
require("./middlewares/firebaseAuth");

const app = express();

//Morgan will handle logging HTTP requests, 
// while winston logger will take care of your application-specific logs
if(config.env!=="test"){
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

const userRoutes = require("./routes/v1/userRoutes");
// const vendorRoutes = require("./routes/v1/vendorRoutes");
// const adminRoutes = require("./routes/v1/adminRoutes");

// Reroute all API request starting with "/v1" route
app.use("/v1/user",userRoutes);
// app.use("/v1/vendor",vendorRoutes);
// app.use("/v1/admin", adminRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
