const mongoose = require('mongoose')
const {Schema} = mongoose

const quesSchema = new Schema({
    text : {
        type : String,
        required : true,
    },
    tag : {
        type : String,
        default : "general"
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    date : {
        type : Date,
        default : Date.now
    },

})

const Question = mongoose.model('question', quesSchema);
Question.createIndexes()
module.exports = Question