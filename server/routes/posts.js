const express = require('express');
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose');
const verifyUser = require('../middleware/verifyUser');
const Question = require('../models/question.js')
const Answer = require('../models/answer')
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


module.exports = router