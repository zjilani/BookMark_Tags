const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        unique:true,
        required: true
    },
    timeCreated:{
        type: Date,
        default: Date.now()
    },
    timeUpdated:{
        type: Date,
        default: Date.now()
    },
    bookmarksTagged:[{
        type:String, //Link of the bookmark
        default:null
    }]
});

const Tag = mongoose.model('Tags', tagSchema);

module.exports = Tag;