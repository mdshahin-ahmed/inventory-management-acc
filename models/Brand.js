const mongoose = require("mongooose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please privide a brand name"],
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "sylhet",
          "mymensingh",
          "khulna",
          "barishal",
          "rangpur",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: ture,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

exports = Brand;
