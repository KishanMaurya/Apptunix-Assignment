const mongoose = require('mongoose')
const { ObjectId} = mongoose.Schema

const todoSchema = new mongoose.Schema({ 
    name:{
        type: String,
        trim:true,
        required:'Name is required',
    },
    completed:{ 
        type: Boolean,
        default: false
    }
    
}, {timestamps:true})

module.exports = mongoose.model('Todo', todoSchema)