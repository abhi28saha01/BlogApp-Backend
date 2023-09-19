const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    postAt : {
        type : Date,
        required : true,
        default : Date.now(),
    },
    EditedAt : {
        type : Date,
        required : true,
        default : Date.now(),
    }
});

module.exports = mongoose.model('Post',PostSchema);