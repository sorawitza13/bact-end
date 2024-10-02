const express = require('express');
const router = express.Router();  /// เส่นทาง
// controller 

const { list,create,read,update,remove } = require('../controllers/category')

/// --------------------------------CRUD----------------------------------------


//middleware
const { auth,adminCheck } = require('../middleware/auth')


//@Enpoint http://localhost:5000/api/category
// เข้าถึงข้อมูลมั้งหมด
router.get('/category',list)

// การสร้างข้อมูลใหม่
router.post('/category',auth,adminCheck,create)

// เข้าถึงข้อมูลแบบเฉพาะเจาะจง
router.get('/category/:id',auth,adminCheck,read)

// การแก้ไขข้อมูลแบบ ระบุ id
router.put('/category/:id',auth,adminCheck,update)

// การลบข้อมูลแบบ ระบุ id
router.delete('/category/:id',auth,adminCheck,remove)





module.exports = router