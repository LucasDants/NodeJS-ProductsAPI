import multer from "multer";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateProductController } from "../../../modules/products/useCases/createProduct/CreateProductController";
import { UpdateProductController } from "../../../modules/products/useCases/updateProduct/UpdateProductController";
import { DeleteProductController } from "../../../modules/products/useCases/deleteProduct/DeleteProductController";
import { GetProductController } from "../../../modules/products/useCases/getProduct/GetProductController";
import { ListProductController } from "../../../modules/products/useCases/listProducts/ListProductsController";

import uploadConfig from "../../../config/upload";

const productsRouter = Router();
const upload = multer(uploadConfig);

const getProductController = new GetProductController();
const listProductController = new ListProductController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRouter.use(ensureAuthenticated);

productsRouter.get("/:productId", getProductController.execute);
productsRouter.get("/", listProductController.execute);
productsRouter.post(
  "/",
  upload.single("image"),
  createProductController.execute
);
productsRouter.put(
  "/:productId",
  upload.single("image"),
  updateProductController.execute
);
productsRouter.delete("/:productId", deleteProductController.execute);

export { productsRouter };
