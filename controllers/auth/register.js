const bcrypt = require("bcryptjs");
const gravar = require("gravatar");

// const sgMail = require("@sendgrid/mail");
const idGenerate = require("bson-objectid");

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravar.url(email);
  const verificationToken = idGenerate();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // const mail = {
  //   to: email,
  //   subject: "Verification email",
  //   html: `<a target="_blank" href="http:/localhost:3000/api/users/verify/${verificationToken}">By clicking on the following link, you are confirming your email address.</a>`,
  // };
  // await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      name: result.name,
    },
  });
};

module.exports = register;
