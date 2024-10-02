const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text: true,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    price: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
    },
    images: {
      type: Array,
    },
    details: {
      scientificName: {
        type: String,
      },
      otherNames: {
        type: [String],
      },
      appearance: {
        stem: {
          type: String,
        },
        leaves: {
          type: String,
        },
        flowers: {
          type: String,
        },
        fruits: {
          type: String,
        },
      },
      generalInfo: {
        type: String,
      },
      careInstructions: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model('product', ProductSchema);
