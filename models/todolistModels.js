const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date,
        required: true
    }   
},
{ timestamps: true }
    );

module.exports = mongoose.model('TodoList', todoListSchema);