import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(productId: string, accountId: string) {
    const product = await this.productsRepository.delete(productId, accountId);
    return product;
  }
}
