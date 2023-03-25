const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const validUrl = require('valid-url');
const QuestionUrl = require('../Model/Urls');


const MarkDoneQuestionUrl = async (req, res) => {
    const url = req.body.url;
    if(!url){
        res.status(401).send({
            error: 'Url not provided',
            message: 'Please provide url'
        })
        return;
    }

    if(!validUrl.isUri(url)){
        res.status(401).send({
            error: 'Invalid url',
            message: 'Please provide valid url'
        })
        return;
    }

    const isalready_added = await QuestionUrl.findOne({
        question_url: url
    });

    if(!isalready_added){
        res.status(401).send({
            error: 'Url not added',
            message: 'Please provide another url'
        });
        return;
    }

    const isalready_done = await QuestionUrl.findOne({
        question_url: url,
        is_done: true
    });

    if(isalready_done){
        res.status(401).send({
            error: 'Url already marked done',
            message: 'Please provide another url'
        });
        return;
    }

    try{
        const question_url = await QuestionUrl.findOneAndUpdate({
            question_url: url
        },{
            is_done: true
        });

        res.status(200).send({
            message: 'Url marked done successfully',
            data: question_url
        })
    }catch(err){
        res.status(401).send({
            error: 'Error in marking url',
            message: err
        })
    }
    
}


module.exports = {
    MarkDoneQuestionUrl,
}