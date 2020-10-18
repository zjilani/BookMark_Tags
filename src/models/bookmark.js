const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
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
    publisher:{
        type: String,
        required: true,
    },
    tags:[{
        type:String,
        default:null
    }]
});

const Bookmark = mongoose.model('Bookmarks', bookmarkSchema);

module.exports = Bookmark;