import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  async execute(req: Request, res: Response) {
    const { accountId } = req.account;
    const { title, description, price } = req.body;

    const requestImage = req.file as Express.Multer.File;

    const createProduct = container.resolve(CreateProductUseCase);

    const product = await createProduct.execute({
      supplierId: accountId,
      title,
      description,
      imageURL: requestImage.filename,
      price: Number(price),
    });

    return res.status(201).send(product);
  }
}
