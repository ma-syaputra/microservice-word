'use strict'
const mongoose= require('mongoose')
const {convertLocal} = require('./../helper/localtime')

const definition = {
    _id: {
        type: Number,
        required : true
    },
    word : {
        type:String,
        required : true,
        minlength: 3,
        maxlength: 10
    },
    created_at : {
        type:Date,
        default: convertLocal
    },
    last_updated:{
        type:Date
    }
};

var CounterWordSchema = {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
}

const mdbWord = mongoose.model('words', definition)
const mdbCounterWordSchema = mongoose.model('counters',CounterWordSchema)
module.exports = {
    mdbCounterWordSchema :mdbCounterWordSchema,
    mdbWord: mdbWord
}