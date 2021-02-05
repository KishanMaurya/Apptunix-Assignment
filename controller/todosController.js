const Todo = require('../models/todo')
const moment = require('moment')
exports.index = async(req,res) =>{
    try {
        // const todo= await Todo.find({}).sort({createdAt: -1}).exec()
        let todo = [];
        let docs = await Todo.find({ completed: false }).sort({createdAt: -1}).exec();
        docs.forEach(doc => todo.push(doc));

        docs = await Todo.find({ completed: true }).sort({createdAt: -1}).exec();
        docs.forEach(doc => todo.push(doc));

        res.render('index', {todo:todo,  moment:moment})

    } catch (error) {
        console.log(error)
    }
}
exports.create= async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            req.flash('error','All fields are required..')
            return res.redirect('/api')
        }

        const create = await Todo({name}).save()
        if(create){
            req.flash('success','Task Added Successsfully')
            return res.redirect('/api')
        }else{
            req.flash('error','All fields are required..')
            return res.redirect('/api')
        }
        // res.json(create)
    } catch (error) {
        console.error(error)
        res.status(400).send('Create todo failed..')
    }
}

exports.list= async (req, res) => {
    try {
        const fetchAllItem= await Todo.find({}).sort({createdAt: -1}).exec()
        res.json(fetchAllItem)
    } catch (error) {
        console.error(error)
        res.status(400).send('fetch all item from  todo failed..')
    }
}

exports.read = async (req, res) => {
    const { _id } = req.params;
    let readId = await Todo.findOne({ _id }).exec();
    res.render('update', {todo:readId})
    // res.json(readId)
};

exports.update= async (req, res) => {
    try {
        const {name} = req.body
        const { _id } = req.params;
        const updateOne = await Todo.findOneAndUpdate(
            { _id},
            { name },
            { new: true }
          )
          if(updateOne){
            req.flash('success','Task Updated Successsfully')
            return res.redirect('/api')
        }else{
            req.flash('error','Update One ite from  todo failed..')
            return res.redirect('/api')
        }
    } catch (error) {
        console.error(error)
        res.status(400).send('update One ite from  todo failed..')
    }
}

exports.checkedTask = async (req, res)=>{
    try {
        const _id = req.params.id;
        console.log(_id)
        const checkedTod= await Todo.findByIdAndUpdate(
            _id,
            {"$set":{"completed":true}})
        if(checkedTod){
            req.flash('success','Task Completed Successsfully')
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }
}
exports.remove= async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedOne = await Todo.deleteOne({_id }).exec()
        if(deletedOne){
            req.flash('success','Task Deleted Successsfully')
            return res.redirect('/api')
        }else{
            req.flash('error','Please check your query')
            return res.redirect('/api')
        }
        
    } catch (error) {
        console.error(error)
        res.status(400).send('delete One item from todo failed..')
    }
}
