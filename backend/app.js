const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user-router");
const adminRouter = require("./routes/admin-router.js");
const movieRouter = require("./routes/movie-router");
const bookingsRouter = require("./routes/booking-router");
const cors = require('cors');


dotenv.config();
const app = express();

mongoose
  .connect(
    `mongodb://localhost:27017/`
  )
  .then(() =>
    console.log("Connecting to Database")
  )
  .catch((e) => console.log(e));

// middlewares
app.use(cors());
app.use(express.json())
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

app.listen(5000, () =>
  console.log("Connected To Database And Server is running")
)