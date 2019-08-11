'use strict'
const Joi = require('@hapi/joi')


function checkWord(wordDetails) {
    const schemeWord = {
        level: Joi.string().max(50).required(),
        word: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(wordDetails, schemeWord)
}
function saveWorld(wordDetails) {
    const schemeWord = {
        word: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(wordDetails, schemeWord)
}

function checkLevel(wordDetails) {
    const schemeLevel = {
        level: Joi.number().integer().required()
    }
    return Joi.validate(wordDetails, schemeLevel)
}

module.exports = {
    checkWord: checkWord,
    saveWorld: saveWorld,
    checkLevel:checkLevel
}