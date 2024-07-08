const express = require("express");
const HttpError = require("./models/http-error");
const fileUpload = require("express-fileupload");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;
const apiRouters = require("./router/apiRouters");
const connectDB = require("./config/DB");
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
//Api calls Middleware
app.use("/api", apiRouters);
//Error handler
app.use((error, req, res, next) => {
  if (req.headerSent) {
    next(error);
  }
  res.status(500);
  res.json({ message: error.message || "An unknown error occurred" });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
