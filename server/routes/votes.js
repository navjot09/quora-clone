const express = require('express');
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose');
const verifyUser = require('../middleware/verifyUser');
const Answer = require('../models/answer');
const Upvote = require('../models/upvotes')
const Downvote = require('../models/downvote');
const { body } = require('express-validator');
const router = express.Router();

router.post('/upvote', verifyUser, async (req, res) => {
    try {
        const upvote = new Upvote({answerId : req.body.answerId , upvoteBy : { name : req.user.name, userId : req.user.id }})
        await upvote.save()
        await Answer.updateOne({_id : req.body.answerId}, { upvotes : req.body.upvotes})
        res.status(200).send(upvote)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/removeUpvote' , verifyUser, async (req, res)=>{
    try {
        await Upvote.deleteOne({answerId : req.body.answerId, "upvoteBy.userId" : req.user.id})
        await Answer.updateOne({_id : req.body.answerId}, { upvotes : req.body.upvotes})
        res.status(200)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/isUpvoted', verifyUser, async (req, res) => {
    try {
        const isUpvoted = await Upvote.findOne({answerId : req.body.answerId , "upvoteBy.userId": req.user.id})
        if(isUpvoted){
            res.status(200).send({isUpvoted : true})
        }else{
            res.status(200).send({isUpvoted : false})
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/allUpvotes', verifyUser, async(req, res) => {
    try {
        const isUpvoted = await Upvote.find({answerId : req.body.answerId})
        res.status(200).send(isUpvoted)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/downvote', verifyUser, async (req, res) => {
    try {
        const downvote = new Downvote({answerId : req.body.answerId , downvoteBy : req.user.id })
        await downvote.save()
        res.status(200).send(downvote)
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/removeDownvote' , verifyUser, async (req, res)=>{
    try {
        await Downvote.deleteOne({answerId : req.body.answerId, downvoteBy : req.user.id})
        res.status(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/isDownvoted', verifyUser, async (req, res) => {
    try {
        const isDonwvoted = await Downvote.findOne({answerId : req.body.answerId , downvoteBy : req.user.id})
        if(isDonwvoted){
            res.status(200).send({isDownvoted : true})
        }else{
            res.status(200).send({isDownvoted : false})
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router