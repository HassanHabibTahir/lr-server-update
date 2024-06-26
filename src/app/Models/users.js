const mongoose = require("mongoose");
const { roles } = require("../../helpers/roles");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
    private: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
  profileImage: { type: String },
  lastLoginDate: {
    type: Date,
    default: "",
  },

  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value, "any")) {
        throw new Error("Invalid contact number");
      }
    },
  },
  typeRole: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["monthly", "project-based"],
  },
  salary: {
    type: Number,
  },
  isCommission: {
    type: Boolean,
  },
  dailyJobHours: {
    type: Number,
  },
  country: {
    type: String,
  },
  clientSource: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  isActive:{
    type: Boolean,
    default: true,
  }
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
exports.User = User;
