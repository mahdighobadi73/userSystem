const express = require("express");
const cors = require("cors");
const router = require("./routes/userRouter");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", router);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
