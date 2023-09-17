import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

import { InMemoryProductsRepository } from "../../repositories/inMemory/inMemoryProductsRepository";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { GetProductUseCase } from "../getProduct/GetProductUseCase";

let productsRepositoryInMemory: InMemoryProductsRepository;
let createProductUseCase: CreateProductUseCase;

let getProductUseCase: GetProductUseCase;

describe("Get product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    getProductUseCase = new GetProductUseCase(productsRepositoryInMemory);
  });

  it("should get a product", async () => {
    const product = {
      title: "title",
      description: "description",
      imageURL: "image",
      price: 10,
      supplierId: "1",
    } as ICreateProductDTO;

    const productResult = await createProductUseCase.execute(product);

    const productCreated = await getProductUseCase.execute(productResult.id);

    expect(productCreated).toBe(productResult);
  });
});
