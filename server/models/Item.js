const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

module.exports=mongoose.model('Item',itemSchema);