import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetProductUseCase } from "./GetProductUseCase";

export class GetProductController {
  async execute(req: Request, res: Response) {
    const { productId } = req.params;

    const getProduct = container.resolve(GetProductUseCase);

    const product = await getProduct.execute(productId as string);

    return res.status(200).send(product);
  }
}
