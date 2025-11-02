const mongoose = require('mongoose');
const {Schema} = mongoose

const todoSchema = new Schema({
    title: {
        type: String,

        required: [true, 'Title is required'], 
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
    completionDate : {
        type: Date,
         required: [true, 'Completion date is required'],
    }   
}
    );

module.exports = mongoose.model('todoList', todoSchema);