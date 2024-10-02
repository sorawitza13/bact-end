
const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View Credentials' below to copy your API secret
});

exports.createImage = async (req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: Date.now(),
            resource_type: "auto",
        });
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(500).send('Upload Error!!');
    }
};

exports.removeImage = async (req,res)=>{
    try{
        let image_id = req.body.public_id
        cloudinary.uploader.destroy(image_id,(result)=>{
            res.send(result);
        })
    }catch(err){
        console.log(err);
        res.status(500).send('Upload Error!!');
    }
};