const mongoose = require('mongoose')
const { Schema } = mongoose

const downvoteSchema = new Schema({
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    downvoteBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
})

const Downvote = mongoose.model('downvotes', downvoteSchema);
Downvote.createIndexes()
module.exports = Downvote