import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";

import { AppError } from "../../../../shared/error/AppError";

@injectable()
export class GetProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(productId: string) {
    const product = await this.productsRepository.get(productId);

    if (product == null) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
