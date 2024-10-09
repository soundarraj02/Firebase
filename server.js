const app = require('./app')
const config = require("./config/config")
const logger = require('./config/logger');
const mongoose = require("mongoose");
let server;
mongoose.connect(config.MONGO_DATABASE_DEV).then(()=>{
    logger().info("Connected to mongodb");
}).catch((err)=>{
    console.log(err)
});

app.listen(config.PORT, () => {
    logger().info(`Server is listening on port ${config.PORT}!`)
});


// ------------- Don't Modify  -------------
const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger().info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger().error(error);
    exitHandler();
  };
  
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
  // ------------- Don't Modify  -------------
  