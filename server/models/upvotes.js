const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
})

const upvotesSchema = new Schema({
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    upvoteBy: userSchema
})

const Upvote = mongoose.model('upvotes', upvotesSchema);
Upvote.createIndexes()
module.exports = Upvote