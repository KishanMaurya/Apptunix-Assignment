const express = require("express");

const router = express.Router();

// controller
const {index, create , read , update , remove , list,  checkedTask} = require("../controller/todosController");

router.get('/', index)
router.post('/todo', create)
router.get('/todos', list)
router.get('/todo/:_id', read)
router.post('/todo/update/:_id', update)
router.patch('/todo/check/:id', checkedTask)
router.get('/todo/delete/:_id', remove)

module.exports = router;