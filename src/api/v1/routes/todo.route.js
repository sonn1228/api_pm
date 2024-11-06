// src/routes/todoRoutes.ts
import express from "express";
import controller from "../controller/todo.controller.js";

const router = express.Router();

router.get("/", controller.getTodos);
router.post("/", controller.createTodo);
// router.put('/:id', controller.updateTodoById);
router.delete("/:id", controller.deleteTodoById);
router.patch("/:id", controller.patchTodo);
router.get("/test", controller.test);

export default router;
