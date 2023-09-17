import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

import { InMemoryProductsRepository } from "../../repositories/inMemory/inMemoryProductsRepository";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { GetProductUseCase } from "../getProduct/GetProductUseCase";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

let productsRepositoryInMemory: InMemoryProductsRepository;
let createProductUseCase: CreateProductUseCase;
let getProductUseCase: GetProductUseCase;
let updateProductUseCase: UpdateProductUseCase;

describe("Update product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    updateProductUseCase = new UpdateProductUseCase(productsRepositoryInMemory);
    getProductUseCase = new GetProductUseCase(productsRepositoryInMemory);
  });

  it("should update a product", async () => {
    const product = {
      title: "title",
      description: "description",
      imageURL: "image",
      price: 10,
      supplierId: "1",
    } as ICreateProductDTO;

    const productResult = await createProductUseCase.execute(product);
    await updateProductUseCase.execute(productResult.id, {
      ...product,
      title: "updated",
    });
    const productUpdated = await getProductUseCase.execute(productResult.id);

    expect(productUpdated.title).toBe("updated");
  });
});
