const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const urlSchema = new mongoose.Schema({
    question_url:{
        type: String,
        required: true,
        unique: true
    },
    is_done:{
        type: Boolean,
        default: false
    }
});

const QuestionUrl = mongoose.model('QuestionUrl', urlSchema);

module.exports = QuestionUrl;
