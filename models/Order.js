const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    products:[
        {
            product:{
                type: ObjectId,
                ref:'product'
            },
            count: Number,
            price: Number
        }
    ],
    address:String,
    cartTotal: Number,
    orderstatus:{
        type:String,
        default:'Not Process'
    },
    orderdBy:{
        type:ObjectId,
        ref:'users'
    },
  },
  { timestamps: true }
);
module.exports = Order = mongoose.model('order',OrderSchema)
//สร้าง collection ชื่อ  users
