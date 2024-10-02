const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
//const dotenv = require('dotenv')
require('dotenv').config();
const { readdirSync } = require('fs') // อ่านข้อมูลชื่อโฟลเดอร์ routes อัตโนมัติ
const connectDB = require('./config/db')
// ติดตั้งไลบรารีที่เราติดตั้งจาก 

const tf = require('@tensorflow/tfjs');
const multer = require('multer');



const app = express()

// ConnectDB
connectDB()


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

const upload = multer({ dest: 'uploads/' });


//Routes เรียกใช้เส้นทาง API 
// http://localhost:3000/
// #วิธีการเรียกใช้แบบทั่วไป 1
//app.use('/api' , require('./routes/api'))

// #วิธีการเรียกใช้แบบที่ 2 ออโต้
readdirSync('./routes')
.map((r)=> app.use('/api' , require('./routes/'+r)))  // ตัวแปร r จะเก็บชื่อโฟลเดอร์ใน routes

const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server is running on port '+port)
})