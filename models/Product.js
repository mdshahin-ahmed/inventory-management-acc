const mongoose = require("mongoose");
// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please privide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique!"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs", "bag"],
        message: "Unit value can't be {VALUES}, must be kg/liter/pcs/bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },

          message: "please provide valid image urls",
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middlewares for saving data: pre / post

productSchema.pre("save", function (next) {
  // this ->
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
