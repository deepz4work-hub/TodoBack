## Technology Used

M: MongoDB  (DB)
E: ExpressJs (Backend)
R: Reactjs (Frontend)
N: Nodejs (Backend)


## Backend Installation

# npm init -y
# npm install express
# npm i -g nodemon
# npm i dotenv
# npm i mongoose

## Configuring MongoDB
I used MongoDB atlas
# steps:
    create a Project
    create a cluster
    name the cluster and get the MongoClientURI


## API Endpoints [Implement API Logics]:

GET     /todolist   
POST    /todolist
GET     /todolist/[with query]
Delete  /todolist/:id
Patch   /todolist/:id

## schema  of the db is defined in the models 
todoListSchema
Filename : /models/todolistModels.js

## controller will be having the set backend logic in different functions and logic of router
getAllTodoLists
Filename: /controller/todolistController.js

following components are created for each crud operations

GET     getAllTodoLists  
POST    createTodoList
GET     getTodoListById
Delete  deleteTodoList
Patch   updateTodoList


## router connectes controller via model
router
Filename:/router/alltodolist/js

The following modules are imported and routed as below

router.get('/:id', getTodoListById);
router.get('/', getAllTodoLists);
router.post('/', createTodoList);
router.patch('/:id', updateTodoList);
router.delete('/:id', deleteTodoList);

# Error Handling and Validation
 
 Validations are done from frontend still the backend validation are required

 so each module in the controller will give appropriate messages

In controller the data send and accepted are scrutinized using error boundary
500  server Error 
200  Response OK
400  Invalid request. Missing required fields.
404  Data not Found

# environment variables in .env file
PORT=4000
MONGO_URI=mongodb+srv://deepz:deepz123@mern-project-todolist.kyulzo0.mongodb.net/?retryWrites=true&w=majority&appName=Mern-Project-todolist
