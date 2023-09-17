import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";

import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(productId: string, data: ICreateProductDTO) {
    const product = await this.productsRepository.put(productId, data);

    return product;
  }
}
