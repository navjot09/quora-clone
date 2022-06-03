const mongoose = require('mongoose')
const {Schema} = mongoose

const ansSchema = new Schema({
    text : {
        type : String,
        required : true,
    },
    question : {
        type : {
            id : mongoose.Schema.Types.ObjectId,
            text : String
        }
    },
    postedBy : {
        type : {
            id : mongoose.Schema.Types.ObjectId,
            name : String
        }
    },
    date : {
        type : Date,
        default : Date.now
    },
})

const Answer = mongoose.model('answer', ansSchema);
Answer.createIndexes()
module.exports = Answer