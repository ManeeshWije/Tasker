const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//skeleton of a todo
const TodoSchema = new Schema({
  //need text
  text: {
    type: String,
  },
  //true or false for completed
  complete: {
    type: Boolean,
    default: false,
  },
  //when it was added
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
