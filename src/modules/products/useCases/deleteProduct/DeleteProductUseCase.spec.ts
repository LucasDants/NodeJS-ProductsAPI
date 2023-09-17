import { AppError } from "../../../../shared/error/AppError";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

import { InMemoryProductsRepository } from "../../repositories/inMemory/inMemoryProductsRepository";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { GetProductUseCase } from "../getProduct/GetProductUseCase";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

let productsRepositoryInMemory: InMemoryProductsRepository;
let createProductUseCase: CreateProductUseCase;

let getProductUseCase: GetProductUseCase;
let deleteProductUseCase: DeleteProductUseCase;

describe("Delete product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    getProductUseCase = new GetProductUseCase(productsRepositoryInMemory);
    deleteProductUseCase = new DeleteProductUseCase(productsRepositoryInMemory);
  });

  it("should delete a product", async () => {
    const product = {
      title: "title",
      description: "description",
      imageURL: "image",
      price: 10,
      supplierId: "1",
    } as ICreateProductDTO;

    const productResult = await createProductUseCase.execute(product);

    await deleteProductUseCase.execute(
      productResult.id,
      productResult.supplierId
    );

    expect(async () => {
      await getProductUseCase.execute(productResult.id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
