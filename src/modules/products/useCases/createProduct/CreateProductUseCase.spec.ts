import { CreateProductUseCase } from "./CreateProductUseCase";

import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

import { InMemoryProductsRepository } from "../../repositories/inMemory/inMemoryProductsRepository";
import { GetProductUseCase } from "../getProduct/GetProductUseCase";

let productsRepositoryInMemory: InMemoryProductsRepository;
let createProductUseCase: CreateProductUseCase;
let getProductUseCase: GetProductUseCase;

describe("Create product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    getProductUseCase = new GetProductUseCase(productsRepositoryInMemory);
  });

  it("should create a product", async () => {
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
