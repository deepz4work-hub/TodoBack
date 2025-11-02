const express = require('express');
const router = express.Router();
const {
    getTodoList,
    createTodoList,
    updateTodoList,
    deleteTodoList
} = require('../controller/todollistController');
    

/*
Route: /api/todolist/123
Method: GET
Description: Retrieve single todo lists
Parameters: None
*/
router.get('/:id', getTodoList);

/*
Route: /api/todolist/
Method: GET
Description: Retrieve all todo lists
Parameters: None
*/


router.get('/', getTodoList);

/*
Route: /api/todolist/
Method: POST
Description: Create a new todo list
Parameters: {"title":String, "description":String, "active":Boolean, "completionDate":Date}
*/
router.post('/', createTodoList);

/*
Route: /api/todolist/123
Method: PATCH
Description: update a new todo list
Parameters:id
Request: {"title":String, "description":String, "active":Boolean, "completionDate":Date}
*/

router.patch('/:id', updateTodoList);

/*
Route: /api/todolist/123
Method: DELETE
Description: delete a new todo list
Access: Public
Parameters: id
*/
router.delete('/:id', deleteTodoList);


module.exports = router;