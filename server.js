const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
