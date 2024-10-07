const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routes/users");
const Route = require("./routes/itineraryRoutes");

app.use("/auth", userRouter);
app.use("/main", Route);

mongoose.connect(
  "mongodb+srv://lavanyalaharik2003:ODivQhnpruPljjWa@cluster0.xpf1ehh.mongodb.net/atlan"
);

app.listen(3000, () => {
  console.log("server started on port 3000");
});
