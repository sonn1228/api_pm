import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";

// Define Todo schema
const TodoSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4(),
  },
  id: {
    type: String,
    default: uuidv4(),
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create and export Todo model
const TodoModel = model("Todo", TodoSchema);

export default TodoModel;
