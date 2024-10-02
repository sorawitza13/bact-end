const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({  
    TambonID: {
        type: String
    },
    TambonThai: {
        type: String
    },
    TambonEng: {
        type: String
    },
    TambonThaiShort: {
        type: String
    },
    TambonEngShort: {
        type: String
    },
    DistrictThaiShort: {
        type: String
    },
    DistrictEngShort: {
        type: String
    },
    ProvinceID: {
        type: String
    },
    ProvinceThai: {
        type: String
    },
    ProvinceEng: {
        type: String
    },
    PostCodeMain: {
        type: String
    },
    PostCodeAll: {
        type: String
    },
})
module.exports = Province = mongoose.model('provinces',provinceSchema)