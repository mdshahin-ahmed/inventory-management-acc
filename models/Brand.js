const mongoose = require("mongooose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please privide a brand name"],
    maxLength: 100,
    unique: true,
    lowercase: true,
  },
  description: String,
  email: {
    type: String,
    validate: [validator.isEmail, "please provide a valid email"],
    lowercase: true,
  },
  website: {
    type: String,
    validate: [validator.isURL, "Please privide a valid url"],
  },
  location: String,
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
  suppliers: [
    {
      name: String,
      contactNumber: String,
      id: {
        type: String,
        ref: "Supplier",
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  timestamps: ture,
});

const Brand = mongoose.model("Brand", brandSchema);

exports = Brand;
