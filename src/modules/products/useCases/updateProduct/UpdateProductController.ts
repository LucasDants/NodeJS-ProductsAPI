import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";
import { Product } from "@prisma/client";

export class UpdateProductController {
  async execute(req: Request, res: Response) {
    const { productId } = req.params;
    const { accountId } = req.account;
    const { title, description, price } = req.body;

    const updateProduct = container.resolve(UpdateProductUseCase);
    const requestImage = req.file as Express.Multer.File;

    const newProduct = {
      title,
      description,
      price: Number(price),
      supplierId: accountId,
    } as Product;

    if (req.file?.filename) {
      newProduct.imageURL = requestImage.filename;
    }

    const product = await updateProduct.execute(productId, newProduct);

    return res.status(200).send(product);
  }
}
