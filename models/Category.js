const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = Category = mongoose.model('category',CategorySchema)
//สร้าง collection ชื่อ  users
