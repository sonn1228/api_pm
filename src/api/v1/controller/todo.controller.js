import TodoModel from "../../../models/todo.model.js";
import { successResponse, errorResponse } from "../../../helpers/response.js";

const controller = {
  getTodos: async (req, res) => {
    try {
      const params = req.query;
      const filter = {};

      if (params.title) {
        filter.title = { $regex: params.title, $options: "i" };
      }

      if (params.status) {
        filter.status = params.status;
      }

      // Add more filters if needed

      const todoList = await TodoModel.find(filter);

      successResponse(res, 200, "success", { todoList });
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  },

  deleteTodoById: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedTodo = await TodoModel.deleteOne({ _id: id });
      console.log("deletedTodo: ", deletedTodo);

      if (deletedTodo.deletedCount > 0) {
        successResponse(res, 200, "Todo deleted successfully", { deletedTodo });
      } else {
        errorResponse(res, 404, "Todo not found");
      }
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  },

  test: async (req, res) => {
    res.send("<h1>Hello world</h1>");
  },

  createTodo: async (req, res) => {
    try {
      const todo = req.body;
      const newTodo = new TodoModel({
        ...todo,
      });
      await newTodo.save();
      successResponse(res, 200, "Todo created successfully", newTodo);
    } catch (error) {
      res.json({ error });
    }
  },

  patchTodo: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const todo = await TodoModel.findById(id);

      if (todo) {
        Object.assign(todo, body);
        await todo.save();
        res.json(todo);
      } else {
        errorResponse(res, 404, "Todo not found!"); // Use 404 for Not Found
      }
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  },
}

export default controller;