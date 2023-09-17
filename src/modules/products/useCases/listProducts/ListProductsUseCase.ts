import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(order?: "asc" | "desc", accountId?: string) {
    const product = await this.productsRepository.list(order, accountId);

    return product;
  }
}
