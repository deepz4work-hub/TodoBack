
const control = require("../models/todolistModels");

const deleteTodoList = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "Invalid fields",
    });
  }

  try {
    const deletedTodo = await control.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        msg: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "deleted successfully",
    });
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        msg: "Server Error",
        error: error.message,
      });
    }
  }
};

const createTodoList = async (req, res) => {
  if (
    !req.body ||
    req.body.title === undefined ||
    req.body.completionDate === undefined
  ) {
    return res.status(400).json({
      success: false,
      msg: "Invalid fields.",
    });
  }
  try {
    const { title, description, active, completionDate } = req.body;
    
    // Create the todo in MongoDB
    const newTodo = await control.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      active: active || false,
      completionDate: new Date(completionDate),
    });

 
    // Return success response with the created todo data
    return res.status(200).json({
      success: true,
      msg: "created successfully",
      data: {
        _id: newTodo._id,
        title: newTodo.title,
        description: newTodo.description,
        active: newTodo.active,
        createDate: newTodo.createDate,
        completionDate: newTodo.completionDate
      }
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error: err.message,
      details: "Check server console for full error details"
    });
  }
};

const updateTodoList = async (req, res) => {
  if (
    !req.params.id ||
    !req.body ||
    req.body.title === undefined ||
    req.body.completionDate === undefined
  ) {
    return res.status(400).json({
      success: "false",
      msg: "knvalid fields.",
    });
  }
  try {
    const { id } = req.params;
    const { title, description, active, completionDate } = req.body;
    const updatedList = await control.findByIdAndUpdate(id, {
      title: title.trim(),
      description: description.trim(),
      active: active,
      completionDate: new Date(completionDate),
    });
    if (!updatedList) {
      return res.status(404).json({
        success: false,
        msg: "Data not found ",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error: err.message,
    });
  }
};

const getTodoList = async (req, res) => {
  try {
    const id = req.params.id;
    const todos = [];
    if (!id) {
      let datas = await control.find();
      todos.push(...datas);
    } else {
      let data = await control.findById(id);
      todos.push(data);
    }
    if (todos.length == 0) {
      return res.status(404).json({
        success: false,
        msg: "data not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "fetched successfully",
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server wrror",
    });
  }
};
module.exports = {
  deleteTodoList,
  createTodoList,
  updateTodoList,
  getTodoList,
};
