import { Router } from "express";

import { authRouter } from "./auth.routes";

import { accountRouter } from "./account.routes";
import { productsRouter } from "./products.routes";

const router = Router();

router.use(authRouter);
router.use(accountRouter);
router.use("/products", productsRouter);

export { router };
