const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    //const { name } = req.body
    const product = await new Product(req.body).save();

    console.log(req.body);
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Fail!!");
  }
};

exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);

    //const { name } = req.body
    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);

    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Fail!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    res.send(deleted);
  } catch (err) {
    res.status(500).send("Remove Product Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category") ///เปรียบสเหมือนการ join ให้ Mysql
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Read Product Error!!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Update Product Error!!");
  }
};

/// รายการสินค้าขายดี
exports.listby = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    //const { name } = req.body
    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);

    res.send(product);
  } catch (err) {
    res.status(500).send("listBy Product Fail!!");
  }
};


const handleQuery = async(req,res,query)=>{
    let products = await Product.find({$text:{$search:query}})
    .populate("category","_id name",)   /// populate("category","_id name",)  , อากิวเมนตัวที่2 _id กับ name แปลว่าเลือกแค่ 2 fil นั่น
    res.send(products)
}

const handlePrice = async(req,res,price)=>{
  let products = await Product.find({
    price:{
      $gte:price[0], /// มากกว่า
      $lte:price[1] /// น้อยกว่า
    }
  })
  .populate("category","_id name",)   /// populate("category","_id name",)  , อากิวเมนตัวที่2 _id กับ name แปลว่าเลือกแค่ 2 fil นั่น
  res.send(products)
}



const handleCategory = async(req,res,category)=>{
  let products = await Product.find({category})
  .populate("category","_id name",)   /// populate("category","_id name",)  , อากิวเมนตัวที่2 _id กับ name แปลว่าเลือกแค่ 2 fil นั่น
  res.send(products)
}


exports.searchFilters = async(req,res)=>{
    const { query,price,category } = req.body

    if(query){
        console.log("query", query);
        await handleQuery(req,res,query)
    }

    /// price  [0,200]   0-200 ช่วงราคา 
    if(price !== undefined){
        console.log("price----->", price);
        await handlePrice(req,res,price);
    }

    if(category){
        console.log("category----->", category);
        await handleCategory(req,res,category);
    }
}

