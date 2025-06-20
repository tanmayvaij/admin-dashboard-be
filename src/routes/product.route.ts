import { Router } from "express";
import { roleCheck, tokenCheck, validateRequestBody } from "../middlewares";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/products";
import {
  productSchemaValidator,
  updateProductSchemaValidator,
} from "../validators";

export const productRouter = Router();

productRouter.route("/").get(getAllProductsController);
productRouter.route("/:id").get(getProductByIdController);

productRouter.use(tokenCheck, roleCheck("ADMIN"));

productRouter
  .route("/")
  .post(
    ...validateRequestBody(productSchemaValidator),
    createProductController
  );
productRouter
  .route("/:id")
  .put(
    ...validateRequestBody(updateProductSchemaValidator),
    updateProductController
  )
  .delete(deleteProductController);
