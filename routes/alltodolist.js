const express = require('express');
const router = express.Router();
const {
    getTodoList,
    createTodoList,
    updateTodoList,
    deleteTodoList
} = require('../controller/todollistController');
    
// Example route to get all todo lists
/*
Route: /api/todolist/123
Method: GET
Description: Retrieve single todo lists
Access: Public
Parameters: None
*/
router.get('/:id', getTodoList);

/*
Route: /api/todolist/
Method: GET
Description: Retrieve all todo lists
Access: Public
Parameters: None
*/
// Route: /api/todolist/
// Method: GET
// Description: Retrieve todo lists with optional filters
// Access: Public

router.get('/', getTodoList);

/*
Route: /api/todolist/
Method: POST
Description: Create a new todo list
Access: Public
Parameters: None
*/
router.post('/', createTodoList);

/*
Route: /api/todolist/123
Method: PATCH
Description: update a new todo list
Access: Public
Parameters: None
*/
router.patch('/:id', updateTodoList);

/*
Route: /api/todolist/123
Method: DELETE
Description: delete a new todo list
Access: Public
Parameters: None
*/
router.delete('/:id', deleteTodoList);


module.exports = router;