import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController {
  async execute(req: Request, res: Response) {
    const { accountId } = req.account;
    const { productId } = req.params;

    const deleteProduct = container.resolve(DeleteProductUseCase);

    const product = await deleteProduct.execute(productId, accountId);

    return res.status(204).send(product);
  }
}
