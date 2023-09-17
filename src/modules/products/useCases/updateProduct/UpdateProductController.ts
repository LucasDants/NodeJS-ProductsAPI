import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
  async execute(req: Request, res: Response) {
    const { productId } = req.params;
    const { accountId } = req.account;
    const { title, description, price } = req.body;

    const updateProduct = container.resolve(UpdateProductUseCase);
    const requestImage = req.file as Express.Multer.File;

    const product = await updateProduct.execute(productId, {
      title,
      description,
      price: Number(price),
      imageURL: requestImage.filename,
      supplierId: accountId,
    });

    return res.status(200).send(product);
  }
}
