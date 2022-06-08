const express = require('express');
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose');
const verifyUser = require('../middleware/verifyUser');
const Question = require('../models/question.js')
const Answer = require('../models/answer');
const Upvote = require('../models/upvotes')
const Downvote = require('../models/downvote');
const { body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

router.post('/addQuestion', verifyUser, async (req, res) => {
    try {
        const ques = new Question({
            text: req.body.text,
            tag: req.body.tag,
            postedBy: req.user.id,
        }
        ); 
        ques.save()
        res.send(ques)
    } catch (error) {
        res.send(error);
    }
})

router.post('/addAnswer', verifyUser, (req, res) => {
    try {
        const ans = new Answer({
            text: req.body.text,
            question: req.body.question,
            postedBy: {
                id : req.user.id,
                name : req.user.name
            },
        }
        );
        ans.save()
        res.send(ans)
    } catch (error) {
        res.send(error);
    }
})

router.post('/getAnswers', verifyUser, async(req, res) => {
    try {
       const answers = await Answer.find({"question.id" : req.body.questionId}).sort({date : -1})
        res.send(answers)
    } catch (error) {
        res.send(error)
    }
})


router.post('/getAllAnswers', verifyUser, async(req, res) => {
    try {
       const answers = await Answer.find({}).sort({date : -1})
        res.send(answers)
    } catch (error) {
        res.send(error)
    }
})

router.post('/getAllQuestions', verifyUser, async(req, res) => {
    try {
        const questions = await Question.find({}).sort({date : -1})
        res.send(questions)
    } catch (error) {
        res.send(error)
    }
})

router.post('/getAllQuestions', verifyUser, async(req, res) => {
    try {
        const questions = await Question.find({}).sort({date : -1})
        res.send(questions)
    } catch (error) {
        res.send(error)
    }
})

router.post('/upvote', verifyUser, async (req, res) => {
    try {
        const upvote = new Upvote({answerId : req.body.answerId , upvoteBy : { name : req.user.name, userId : req.user.id }})
        upvote.save()
        await Answer.updateOne({_id : req.body.answerId}, { upvotes : req.body.upvotes})
        res.send(upvote)
    } catch (error) {
        res.send(error)
    }
})

router.post('/removeUpvote' , verifyUser, async (req, res)=>{
    try {
        await Upvote.deleteOne({answerId : req.body.answerId, "upvoteBy.userId" : req.user.id})
        await Answer.updateOne({_id : req.body.answerId}, { upvotes : req.body.upvotes})
        res.send("deleted")
    } catch (error) {
        res.send(error)
    }
})

router.post('/isUpvoted', verifyUser, async (req, res) => {
    try {
        const isUpvoted = await Upvote.findOne({answerId : req.body.answerId , "upvoteBy.userId": req.user.id})
        if(isUpvoted){
            res.send({isUpvoted : true})
        }else{
            res.send({isUpvoted : false})
        }
    } catch (error) {
        res.send(error)
    }
})

router.post('/allUpvotes', verifyUser, async(req, res) => {
    try {
        const isUpvoted = await Upvote.find({answerId : req.body.answerId})
        res.send(isUpvoted)
    } catch (error) {
        res.send(error)
    }
})

router.post('/downvote', verifyUser, async (req, res) => {
    try {
        const downvote = new Downvote({answerId : req.body.answerId , downvoteBy : req.user.id })
        downvote.save()
        res.send(downvote)
    } catch (error) {
        res.send(error)
    }
})


router.post('/removeDownvote' , verifyUser, async (req, res)=>{
    try {
        await Downvote.deleteOne({answerId : req.body.answerId, downvoteBy : req.user.id})
        res.send("deleted")
    } catch (error) {
        res.send(error)
    }
})

router.post('/isDownvoted', verifyUser, async (req, res) => {
    try {
        const isDonwvoted = await Downvote.findOne({answerId : req.body.answerId , downvoteBy : req.user.id})
        if(isDonwvoted){
            res.send({isDownvoted : true})
        }else{
            res.send({isDownvoted : false})
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = router