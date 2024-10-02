const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.listUser = async(req,res)=>{
    try{
        res.send('list Get User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
}

/// เงื่อนไขการทำงาน ของการสมัคร Register ของระบบ
exports.register = async(req,res)=>{
    try{
        // Check User
        const{ username,password} = req.body;
        var user = await User.findOne({username}); //สร้างมาเพื่อเอาไว้กำหนด username ตัวแรก คนแรก
        if(user){ //ถ้าเจอจะส่งว่า User มีแล้ว ไม่พร้อมใช้งาน
           return res.status(400).send("User Already exits");
        }
        /// แต่ถ้าไม่พบ username นี้ในฐานข้อมูล ให้กำหนดลงไปในฐานข้อมูล
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password,
        });

        // Encrypt การเข้ารหัส
        
        user.password = await bcrypt.hash(password, salt); /// เข้ารหัส
        await user.save();

        res.send('Register Success')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
}

/// เงื่อนไขการทำงาน ของการเข้า Login ของระบบ
exports.login = async(req,res) =>{
    try{
        const {username , password} = req.body;
        var user = await User.findOneAndUpdate({username},{new:true}); ///ถ้าเจอจะอัพเดต ว่า username นี้มีการ login เมื่อไหร่  user เป็นตัวแปรที่เก็บค่ามาจาก Mongodb 
        if(user && user.enabled){
            // Check password 
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).send('Password Invalid!!!')
            }
            //Payload
            const payload = {
                user:{
                    username: user.username,
                    role: user.role
                }
            }
            // Generate Token
            jwt.sign(payload,
                'jwtSecret', // โค้ดลับของการเข้ารหัส
                {expiresIn: 3600 },(err,token)=>{ // expiresIn: 3600 ให้ User มีสิทธิค้างอยู่ในระบบได้ 1 ชั่วโมง
                    if(err) throw err; ///ถ้าเจอ err จบการทำงาน
                    res.json({token,payload})
                });
        }
        else{
            return res.status(400).send('User not found!!!!')
        }
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
};

exports.currentUser = async(req,res)=>{
    try{
        //console.log('controller',req.user)
        const user = await User.findOne({username:req.user.username}).
        select('-password').exec();
        res.send(user);
        console.log(user)

    }catch(err){
        console.log('err')
        res.status(500).send("Server Error!")
    }
}

exports.editUser = async(req,res)=>{
    try{
        res.send('edit User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};


exports.deletUser = async(req,res)=>{
    try{
        res.send('Remove User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!') //ส่งข้อ ความเกิดข้อผิดพลาดไปยัง หน้าบ้าน Fontend พร้อม Status 500
    }
};