const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const QuestionUrl = require('../Model/Urls');

const getQuestionUrl = async (req, res) => {
    const sizedata = await QuestionUrl.find();
    const random_number = Math.floor(Math.random() * sizedata.length);
    try{
        const url = await QuestionUrl.findOne().skip(random_number);
        res.status(200).send({
            message: 'Url fetched successfully',
            data: url
        })
    }catch(err){
        res.status(401).send({
            error: 'Error in fetching url',
            message: err
        })
    }
}

module.exports = {
    getQuestionUrl,
}