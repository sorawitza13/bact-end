const express = require('express')
const router = express.Router();

const { listProvince } = require('../controllers/locations');

//@Enpoint localhost:5000/api/province
//@Method GET
//Access Public
router.get('/province', async (req, res) => {
    const { postcode } = req.query;
    
    try {
        const data = await Province.find({ PostCodeMain: postcode });
        
        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ message: "ไม่พบข้อมูลสำหรับรหัสไปรษณีย์นี้" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;