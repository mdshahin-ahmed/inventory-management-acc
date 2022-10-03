const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
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

    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },

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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },

    store: {
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please privide a supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middlewares for saving data: pre / post

stockSchema.pre("save", function (next) {
  // this ->
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
