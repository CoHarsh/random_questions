const express = require('express');
const { model } = require('mongoose');

const router = express.Router();

// controllers

const { addQuestionUrl } = require('./Controller/AddQuestionUrl');
const { getQuestionUrl } = require('./Controller/GetQuestionUrl');
const { MarkDoneQuestionUrl } = require('./Controller/MarkDoneQuestionUrl');
const domains  = require('./domains');

router.post('/addquestionurl',addQuestionUrl);
router.get('/getquestionurl',getQuestionUrl);
router.post('/completedthequestion',MarkDoneQuestionUrl);
router.get('/getdomains',(req,res) => {
    const domainss = [];
    for(let i = 0; i < domains.length; i++){
        domainss.push(domains[i]);
    }
    res.status(200).send({
        "message": "success",
        "data": domainss
    })
});

router.get('*', (req, res) => {
    res.status(404);
    res.send({
        error: 'Wrong route',
        message: 'Please check the route'
    })
});

router.post('*', (req, res) => {
    res.status(404);
    res.send({
        error: 'Wrong route',
        message: 'Please check the route'
    })
});


module.exports = router;