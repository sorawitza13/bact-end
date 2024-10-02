const Province = require('../models/province')


exports.listProvince = async(req,res) => {
    try{
        const dataProvince = await Province.find({})
        res.send(dataProvince)
    }
    catch(err){
        console.log(err);
        res.status(400).send("Server Error!!");
    }
}