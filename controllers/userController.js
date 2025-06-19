const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate("posts");
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts");
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
};

exports.uploadProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { profilePhoto: req.file.filename },
    { new: true }
  );
  res.json(user);
};
