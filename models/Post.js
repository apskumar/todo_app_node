const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    post:{
        type: String
    },
    status:{
        type: String
    }
});

module.exports = Post = mongoose.model('post',PostSchema)