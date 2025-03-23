const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Done"],
    default:"Pending"
  },
  dueDate: {
    type: Date,
    required: true,
  },
 
},{timestamps:true});


const task = mongoose.model("Task", taskSchema);

module.exports = task;