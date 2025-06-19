const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  profilePhoto: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model("User", userSchema);
