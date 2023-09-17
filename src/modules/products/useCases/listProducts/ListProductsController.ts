import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductsUseCase } from "./ListProductsUseCase";

type Params = {
  filter: "accountId";
  order: "asc" | "desc" | undefined;
};

export class ListProductController {
  async execute(req: Request, res: Response) {
    const { filter, order } = req.query as Params;
    const { accountId } = req.account;

    const listProducts = container.resolve(ListProductsUseCase);

    const filterBy = filter === "accountId" ? accountId : undefined;

    const products = await listProducts.execute(order, filterBy);

    return res.status(200).send(products);
  }
}
