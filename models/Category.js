const monggose = require("mongoose");
const validator = require("validator");
const { ObjectId } = monggose.Schema.Types;

const categorySchema = monggose.Schema(
  {
    name: {
      type: String,
      trin: true,
      required: [true, "please a category name"],
      lowercase: true,
      unique: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "please privide a valid URL"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = monggose.model("Category", categorySchema);

exports = Category;
