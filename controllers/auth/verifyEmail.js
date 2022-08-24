const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(
      404,
      "Don't find this verificationToken, maybe, your account has already been passed? If it's needed resent verification letter"
    );
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });

  res.json({ message: "Verification successful" });
};

module.exports = verifyEmail;
