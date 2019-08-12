const response = require('./../response/response')

const _ = require('lodash') 
const wordAi = require('./../schema/wordDefinition').mdbCounterWordSchema
const scoreSchema = require('./../schema/scoreDefinition').mdbScore
var statusResp = null
const statusAppCode = require('./../config/status').statusAppCrud
const statusErrCode = require('./../config/status').errorApp
const {convertAny,convertLower} = require('./../helper/lower')


function home(req, res) {
    console.log(req.crudder)
    // console.log(req.crudderWord)
    return response.success_app("Im Here", res)
}

 async function saveWord(req, res) {
    const { saveWorld } = require('./../validation/wordValidation')
    const wordDetails = _.pick(req.body, ['word'])
    const { error } = saveWorld(wordDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)

    } 
    const lowerCase = convertAny(wordDetails.word)
    wordDetails.word = lowerCase
 
    const wordIncrement = await wordAi.findByIdAndUpdate({_id: 'level'}, {$inc: { seq: 1}});
    const statusErrInc = statusErrCode('inc')
    if(!wordIncrement) return response.bad_app(statusResp,statusErrInc.code,res)
    wordDetails["_id"] = wordIncrement.seq
    try {
    const docWord =  new req.crudder(wordDetails)
    saveWord = await docWord.save()
    const statusApp = statusAppCode('success')
    return response.success_app(statusApp.message,statusApp.code,res)
    } catch (error) {
        const statusErrDb = statusErrCode('errdb')
        return response.bad_app(statusResp,statusErrDb.code,res)
    }    
}

async function checkWord(req, res) {
    const { checkWord } = require('./../validation/wordValidation')
    const wordDetails = _.pick(req.body, ['word','level'])
    console.log(wordDetails)
    const { error } = checkWord(wordDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)

    }
    const checkLevel = await getLevel(req.data.token)
    console.log(checkLevel)
    if(checkLevel.level==wordDetails.level){
        const payLoad = {
            'word':wordDetails.word,
            '_id': wordDetails.level
        }
    
        const checkDbWord = await req.crudder.findOne(payLoad)
        const statusErrdb = statusErrCode('errdb')
        if(checkDbWord){
           try {
                await addScore(req.data['_id'],res)
           } catch (error) {
                return response.bad_app(statusErrdb.message,statusErrdb.code,res)
           }
        }else{
            try {
              minusScore(req.data['_id'],res)
            } catch (error) {
                return response.bad_app(statusErrdb.message,statusErrdb.code,res)
            }
        }
    }else{
        return res.status(401).json("unauthorized");
    }
}



async function addScore(id,res){
    const userByid = id 
    const scoreDetails ={'userid':parseInt(userByid)}
    const { validateScore } = require('../validation/scoreValidation')
    const { error } = validateScore(scoreDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)
    } 
    const checkScore = await scoreSchema.findOne(scoreDetails)
    if(!checkScore) {
        const statusErrUsername = statusErrCode('usernotfound')
        return response.bad_app(statusErrUsername.message,statusErrUsername.code,res)
    }
    try {
        await scoreSchema.findOneAndUpdate(scoreDetails,{$inc: { score: 10,level:1 }})
        const statusApp = statusAppCode('success')
        return response.success_app(statusApp.message,statusApp.code,res)
    } catch (error) {
        const statusErrScoreAdd = statusErrCode('scorecantadd')
        return response.bad_app(error,statusErrScoreAdd.code,res)
    }

}

async function minusScore(id,res){
    const userByid = id
    const scoreDetails ={'userid':parseInt(userByid)}
    const { validateScore } = require('../validation/scoreValidation')
    const { error } = validateScore(scoreDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)
    } 
    const checkScore = await scoreSchema.findOne(scoreDetails)
    if(!checkScore) {
        const statusErrUsername = statusErrCode('usernotfound')
        return response.bad_app(statusErrUsername.message,statusErrUsername.code,res)
    }
    const statusApp = statusAppCode('success')
    if(checkScore.score==0){
        return response.success_app(statusApp.message,statusApp.code,res)
    }
    try {
        await scoreSchema.findOneAndUpdate(scoreDetails,{$inc: { score: -1 }})
        return response.success_app(statusApp.message,statusApp.code,res)
    } catch (error) {
        const statusErrScoreAdd = statusErrCode('scorecantadd')
        return response.bad_app(error,statusErrScoreAdd.code,res)
    }


}
function getLevel(token){
    const options = {
        headers: {
            'authorization' : token
        },
        method: 'GET',
        url: 'http://localhost:4003/detail',
        json : true  
    };

    const dataLevel= new Promise((resolve, reject) => {
    request(options, function(err, responses, body) {
        if(responses.statusCode == 200){
            resolve(body.response)
        }else{
            reject(err)
        }
    });
})
    return dataLevel

}

async function getWord(req,res){
    const level = req.query.level
    const payLoad = {
        'level': parseInt(level)
        }
    
     
    const { checkLevel } = require('./../validation/wordValidation')
    const { error } = checkLevel(payLoad)
     if(error){
         const statusErrValidation = statusErrCode('validation')
         return response.bad_app(error,statusErrValidation.code,res)
     } 
     const dataLevel= {
        '_id': parseInt(level)
        }
     
     const checkDbWord = await req.crudder.findOne(dataLevel)
     if(!checkDbWord){
        const statusErrNotFound= statusErrCode('wordnotfound')
        return response.bad_app(statusErrNotFound.message,statusErrNotFound.code,res)
       

     } 
     randomWord(checkDbWord.word,res)
 
 
 }
 function randomWord(word,res){

    var word = word.split(""),
    n = word.length;

    for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = word[i];
    word[i] = word[j];
    word[j] = tmp;
    }
    const randFix =word.join("")
    const statusApp = statusAppCode('success')
    return response.success_app(randFix,statusApp.code,res)

 }

 async function updateWord(req,res){
    const { checkWord } = require('./../validation/wordValidation')
    const wordDetails = _.pick(req.body, ['word','level'])
    const { error } = checkWord(wordDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)

    }
     const dataLevel= {
        '_id': parseInt(wordDetails.level)
        }
     const queryWord = {'word':wordDetails.word} 
     try {
        await req.crudder.findOneAndUpdate(dataLevel,queryWord)
        const statusApp = statusAppCode('success')
        return response.success_app(statusApp.message,statusApp.code,res)
     } catch (error) {
        return response.bad_app(statusResp,statusErrdb.code,res)
     } 

 
 
 }

module.exports = {
    home: home,
    saveWord: saveWord,
    checkWord:checkWord,
    updateWord:updateWord,
    getWord:getWord
}