const express = require('express');
const router = express.Router();
// controller
const {
    register,
    login,
    listUser,
    editUser,
    deletUser,
    currentUser

} = require('../controllers/auth');


// middleware
const { auth,adminCheck } = require('../middleware/auth');


//@Enpoint http://localhost:3000/api/register
//@Method  POST
//@Access Public
router.post('/register',register);


//@Enpoint http://localhost:3000/api/login
//@Method  POST
//@Access Public
router.post('/login',login);




//@Enpoint http://localhost:3000/api/current-user
//@Method  POST
//@Access Private
router.post('/current-user',auth, currentUser);


//@Enpoint http://localhost:3000/api/current-admin
//@Method  POST
//@Access Private
router.post('/current-admin',auth,adminCheck, currentUser);








//Route
//@Enpoint http://localhost:3000/api/auth
//@Method  GET
//@Access Public
router.get('/auth',listUser);

//@Enpoint http://localhost:3000/api/auth
//@Method  PUT
//@Access Public
router.put('/auth',editUser);

//@Enpoint http://localhost:3000/api/auth
//@Method  Delete
//@Access Public
router.delete('/auth',deletUser);





module.exports = router



//Creat = PUT/POST เพิ่มข้อมูลลงไป
//Read = GET เรียกดูข้อมูล
//Update = PUT/POST/PATCH แก้ไขข้อมูล
//Delete = DELETE ลบข้อมูล