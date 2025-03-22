const Task = require("../models/Task/task");
const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");


// create
const create = async (req,res) => {
    try{
     const {title,description,dueDate,status="to do"} = req.body
     await Task.create({
        user:req.user._id,
        title,
        description,
        dueDate,
        status

     })
      return SuccessHandler(
           {
            message:"Task created successfully"
           },
           200,
           res
         );
    }catch (error){
        return ErrorHandler(error.message, 500, req, res);
    }
}

// update
const update = async (req,res) => {
    try{
     const {id} = req.params
     const {title,description,dueDate,status} = req.body

     const isTaskExist = await Task.findById(id)
     if(!isTaskExist){
        return ErrorHandler("Task not found", 404, req, res);
     }
    
     isTaskExist.title = title || isTaskExist.title
     isTaskExist.description = description || isTaskExist.description
     isTaskExist.status = status || isTaskExist.status
     isTaskExist.dueDate = dueDate || isTaskExist.dueDate

     await isTaskExist.save()
      return SuccessHandler(
           {
            message:"Task updated successfully"
           },
           200,
           res
         );
    }catch (error){
        return ErrorHandler(error.message, 500, req, res);
    }
}

// delete
const deleteTask = async (req,res) => {
    try{
     const {id} = req.params
   
     const isTaskExist = await Task.findById(id)
     if(!isTaskExist){
        return ErrorHandler("Task not found", 404, req, res);
     }
    
     await isTaskExist.delete()
      return SuccessHandler(
           {
            message:"Task deleted successfully"
           },
           200,
           res
         );
    }catch (error){
        return ErrorHandler(error.message, 500, req, res);
    }
}

// get all
const getAll = async (req,res) => {
    try{
   const {search} = req.query

   const searchFilter = search ? {
    title: { $regex: search, $options: "i" }
   }:{}
   
     const tasks = await Task.find({...searchFilter})
      return SuccessHandler(
           {
            message:"Task retrieve successfully",
            data:tasks
           },
           200,
           res
         );
    }catch (error){
        return ErrorHandler(error.message, 500, req, res);
    }
}



module.exports = {
  create,
  update,
  deleteTask,
  getAll,
};