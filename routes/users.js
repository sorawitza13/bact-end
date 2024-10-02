const express = require('express');
const router = express.Router();
// controller

const { 
    listUsers,
    readUsers,
    updateUsers,
    removeUsers,
    changeStatus,
    changeRole,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder

 } = require('../controllers/users')

// middleware
const { auth,adminCheck } = require('../middleware/auth');



//@Enpoint http://localhost:5000/api/users
//@Method  GET
//@Access Private
router.get("/users", auth , adminCheck , listUsers);

//@Enpoint http://localhost:5000/api/users:id
//@Method  GET
//@Access Private
router.get("/users/:id",readUsers);

//@Enpoint http://localhost:5000/api/users
//@Method  PUT
//@Access Private
router.put("/users/:id",updateUsers);

//@Enpoint http://localhost:5000/api/users
//@Method  Delete
//@Access Private
router.delete("/users/:id",removeUsers);

//@Enpoint http://localhost:5000/api/change-status
//@Method  POST
//@Access Private
router.post("/change-status",auth,adminCheck,changeStatus);

//@Enpoint http://localhost:5000/api/change-role
//@Method  POST
//@Access Private
router.post("/change-role",auth,adminCheck,changeRole);

//@Enpoint http://localhost:5000/api/user/cart
//@Method  POST
//@Access Private
router.post("/user/cart",auth,userCart);


//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.get("/user/cart",auth,getUserCart);

//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.delete("/user/cart",auth,emptyCart);

//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.post("/user/address",auth,saveAddress);


//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.post("/user/order",auth,saveOrder);


//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.get("/user/orders",auth,getOrder);


//@Enpoint http://localhost:5000/api/user/cart
//@Method  POST
//@Access Private
router.post("/user/wishlist",auth,addToWishList);

//@Enpoint http://localhost:5000/api/user/cart
//@Method  GET
//@Access Private
router.get("/user/wishlist",auth,getWishList);

//@Enpoint http://localhost:5000/api/user/cart
//@Method  PUT
//@Access Private
router.put("/user/wishlist/:productId",auth,removeWishList);




module.exports = router

//Creat = PUT/POST เพิ่มข้อมูลลงไป
//Read = GET เรียกดูข้อมูล
//Update = PUT/POST/PATCH แก้ไขข้อมูล
//Delete = DELETE ลบข้อมูล