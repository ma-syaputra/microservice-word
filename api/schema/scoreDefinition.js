'use strict'

const mongoose= require('mongoose')
const {convertLocal} = require('../helper/localtime')

const definition = {
    _id: {
        type: Number,
        required : true
    },
    userid : {
        type: Number,
        required : true,
        index: {
            unique: true,
            dropDups: true
        }
    },
    level : {
        type:Number,
        required : true,
        default : 1
    },
    score : {
        type:Number,
        required : true,
        default : 0
    },
    created_at : {
        type:Date,
        default: convertLocal
    },
    last_updated:{
        type:Date
    }
};

var CounterScoreSchema= {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
}

const mdbScore = mongoose.model('Score', definition)


module.exports = {
    mdbScore: mdbScore
}