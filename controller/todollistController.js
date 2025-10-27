const { get } = require("mongoose");
const control = require("../models/todolistModels");

const deleteTodoList = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "Invalid request. Missing required fields",
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
      msg: "Data found and deleted successfully",
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
   console.log(`🚀 Got in create`);
  if (
    !req.body ||
    req.body.title === undefined ||
    req.body.completionDate === undefined
  ) {
    return res.status(400).json({
      success: false,
      msg: "Invalid request. Missing required fields.",
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

    console.log("✅ New todo created:", newTodo);
    
    // Return success response with the created todo data
    return res.status(200).json({
      success: true,
      msg: "Todo created successfully",
      data: {
        _id: newTodo._id,
        title: newTodo.title,
        description: newTodo.description,
        active: newTodo.active,
        createDate: newTodo.createDate,
        completionDate: newTodo.completionDate,
        createdAt: newTodo.createdAt,
        updatedAt: newTodo.updatedAt,
        __v: newTodo.__v
      }
    });
    
  } catch (err) {
    console.error("❌ Create Todo Error:", err);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
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
      msg: "Invalid request. Missing required fields.",
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
      msg: "Data updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
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
        msg: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Data fetched successfully",
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};
module.exports = {
  deleteTodoList,
  createTodoList,
  updateTodoList,
  getTodoList,
};
