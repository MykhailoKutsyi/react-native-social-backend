const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\S+@\S+\.\S+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      require: true,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const email = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  register,
  login,
  email,
};

module.exports = {
  User,
  schemas,
};
