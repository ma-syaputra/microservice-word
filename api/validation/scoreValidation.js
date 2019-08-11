'use strict'
const Joi = require('@hapi/joi')


function validateScore(scoreDetails){
    const schemeScore = {
        userid : Joi.number().integer().required()
        }
    return Joi.validate(scoreDetails,schemeScore)
}

module.exports = {
    validateScore: validateScore
}