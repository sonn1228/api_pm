import express from "express";
import controller from "../controller/product.controller.js";

const router = express.Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.detail);
router.post("/", controller.createProduct);
router.delete("/:id", controller.deleteProductById);
// router.patch("/change-status/:status/:id", productController.changeStatus);
// router.patch("/change-multi", productController.changeMulti);
// router.get("/create", productController.create);
// router.get("/edit/:id", productController.edit);

export default router;
