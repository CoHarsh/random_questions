var validUrl = require('valid-url');
const QuestionUrl = require('../Model/Urls');

const addQuestionUrl = async (req, res) => {
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

    if(isalready_added){
        res.status(401).send({
            error: 'Url already added',
            message: 'Please provide another url'
        });
        return;
    }

    try{
         const question_url = await new QuestionUrl({
            question_url: url
        })
        await question_url.save();
        res.status(200).send({
            message: 'Url saved successfully',
            data: question_url
        })

    }catch(err){
        res.status(401).send({
            error: 'Error in saving url',
            message: err
        })
    }

}



module.exports = {
    addQuestionUrl,
}