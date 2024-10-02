const express = require('express');
const router = express.Router();  /// เส่นทาง

// controller 
const { create,list,remove,read,update,listby,searchFilters } = require('../controllers/product')

/// --------------------------------CRUD----------------------------------------


//middleware
const { auth,adminCheck } = require('../middleware/auth')


//@Enpoint http://localhost:5000/api/product
// เข้าถึงข้อมูลมั้งหมด
router.post('/product',auth,adminCheck, create)
router.get('/product/:count', list)
router.delete('/product/:id',auth,adminCheck, remove)



//@Enpoint http://localhost:5000/api/products
//update
router.get("/products/:id",read)
router.put("/product/:id",auth,adminCheck,update)


//@Enpoint http://localhost:5000/api/productby
router.post("/productby",listby)


// Search
//@Enpoint http://localhost:5000/api/search/filters
router.post('/search/filters',searchFilters)

module.exports = router