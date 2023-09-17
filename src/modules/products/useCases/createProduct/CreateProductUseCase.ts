import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(data: ICreateProductDTO) {
    const product = await this.productsRepository.create(data);

    return product;
  }
}
