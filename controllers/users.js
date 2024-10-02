const bcrypt = require('bcryptjs');

/// Models
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order')
const jwt = require('jsonwebtoken');


// ส่ง req มาเพื่อลบข้อมูลผู้ใช้ทั้งหมด 
exports.listUsers = async(req,res)=>{
    try{
      ///Code
    const user = await User.find({}).select('-password').exec(); /// select('-password') เป็นการลบข้อมูลที่เราไม่อยากเอามาขึ้น API select('-password -role') ลบ 2 ค่า
    res.send(user)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};

// ส่ง req มาเพื่อขอดูข้อมูลผู้ใช้ ตาม id ที่ระบุ
exports.readUsers = async(req,res)=>{
    try{
      ///Code
    const id = req.params.id
    const user = await User.findOne({_id:id}).select('-password').exec()
    res.send(user)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};

// ส่ง req มาเพื่อแก้ไขข้อมูลผู้ใช้ ตาม id ที่ระบั
exports.updateUsers = async(req,res)=>{
    try{
      ///Code
      var {id,password} = req.body.values
      //1 Gen salt
      const salt = await bcrypt.genSalt(10)
      //2 encrypt
      var enPassword = await bcrypt.hash(password, salt); /// เข้ารหัส
      const user = await User.findOneAndUpdate(
        {_id:id},
        {password:enPassword});
      res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};


// ส่ง req มาเพื่อลบข้อมูลผู้ใช้ ตาม id ที่ระบั
exports.removeUsers = async(req,res)=>{
    try{
      ///Code
      const id = req.params.id
      const user = await User.findOneAndDelete({_id:id});
    res.send('hello remove users')

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};


// ส่ง req 
exports.changeStatus = async(req,res)=>{
  try{
    ///Code
    console.log(req.body)
    const user = await User.findOneAndUpdate(
      {_id:req.body.id},
      {enabled:req.body.enabled});
    res.send(user)

  }catch(err){
      console.log(err)
      res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
  }
};


// ส่ง req 
exports.changeRole = async(req,res)=>{
  try{
    ///Code
    console.log(req.body)
    const user = await User.findOneAndUpdate(
      {_id:req.body.id},
      {role:req.body.role});
    res.send(user)

  }catch(err){
      console.log(err)
      res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
  }
};

exports.userCart = async(req,res)=>{
  try{

    const { cart } = req.body

    let user = await User.findOne({username:req.user.username}).exec();
    /// สร้าง array [] เปล่า
    let products = []

      /// Check 
    let cartOld = await Cart.findOne({orderdBy:user._id}).exec();
    if(cartOld){
      await cartOld.deleteOne();
      console.log('remove old cart')
    }
    /// แต่งสินค้า
    for(let i = 0;i < cart.length;i++){
      let object = {}

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;


      products.push(object)
    }
    ///หาผลรวมของตะกร้า
    let cartTotal = 0;
    for(let i = 0;i <products.length;i++){
      cartTotal = cartTotal + products[i].price * products[i].count
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id
    }).save();


    console.log(newCart)
    res.send('userCart Ok')
  }
  catch(err){
    console.log(err)
    res.status(500).send('userCart Server Error')
  }
};


exports.getUserCart = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.user.username}).exec();
    let cart = await Cart.findOne({orderdBy:user._id})
    .populate('products.product',"_id title price")
    .exec();

    const { products,cartTotal } = cart;
    res.json({products,cartTotal});
  }
  catch(err){
    res.status(500).send('getUserCart Error')
  }
};

exports.emptyCart = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.user.username}).exec()

    const empty = await Cart
    .findOneAndDelete({orderdBy:user._id}).exec()

    res.send(empty)

    
  }
  catch(err){
    res.status(500).send('Remove Cart Error')
  }
}



exports.saveAddress = async(req,res)=>{
  try{
    const userAddress = await User
    .findOneAndUpdate({username:req.user.username},
      {address:req.body.address}
    ).exec();

    res.json({ok:true})
  }
  catch(err){
    res.status(500).send('Save Address Error')
  }
}


exports.getOrder = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.user.username}).exec();
    let order = await Order.find({orderdBy:user._id})
    .populate('products.product')
    .exec();

    res.json(order);
  }
  catch(err){
    res.status(500).send('GET ORDER Error')
  }
};



exports.saveOrder = async(req,res)=>{
  try{
    let user = await User.findOne({username:req.user.username}).exec();

    let userCart = await Cart.findOne({orderdBy:user._id}).exec();

    let userAddress = user.address;

    let order = await new Order({
      products:userCart.products,
      orderdBy:user._id,
      cartTotal: userCart.cartTotal,
      address: userAddress
    }).save()

    // เพิ่ม ลด สินค้่า
    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne:{
          filter:{_id:item.product._id},
          update:{$inc:{quantity : -item.count,sold:+item.count}}
        }
      }
    })

    let updated = await Product.bulkWrite(bulkOption,{})

    res.send(updated);
  }
  catch(err){
    res.status(500).send('Save Address Error')
  }
}



exports.addToWishList = async(req,res)=>{
  try{
    const { productId } = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}
    ).exec();
    res.send(user)
  
  }
  catch(err){
    res.status(500).send('Add Wishlist Error')
  }
}

exports.getWishList = async(req,res)=>{
  try{
      let list = await User.findOne({username:req.user.username})
      .select('wishlist')
      .populate('wishlist')
      .exec();
      res.json(list)
  }
  catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}

exports.removeWishList = async(req,res)=>{
  try{
      const{ productId } = req.params
      let user = await User.findOneAndUpdate(
        {username:req.user.username},
        {$pull:{wishlist:productId}}
      ).exec();
      res.send(user)
  }
  catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}
