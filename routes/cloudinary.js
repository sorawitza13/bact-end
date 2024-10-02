const express = require('express');
const router = express.Router();  /// เส่นทาง
// controller 

const { createImage,removeImage} = require('../controllers/cloudinary');
/// --------------------------------CRUD----------------------------------------


//middleware
const { auth,adminCheck } = require('../middleware/auth')


//@Enpoint http://localhost:5000/api/images
// เข้าถึงข้อมูลมั้งหมด
router.post('/images',auth,adminCheck,createImage)
router.post('/removeimages',auth,adminCheck,removeImage)





module.exports = router