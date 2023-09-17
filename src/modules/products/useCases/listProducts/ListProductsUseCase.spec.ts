import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

import { InMemoryProductsRepository } from "../../repositories/inMemory/inMemoryProductsRepository";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";

import { ListProductsUseCase } from "./ListProductsUseCase";

let productsRepositoryInMemory: InMemoryProductsRepository;
let createProductUseCase: CreateProductUseCase;

let listProductUseCase: ListProductsUseCase;

describe("List product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    listProductUseCase = new ListProductsUseCase(productsRepositoryInMemory);
  });

  it("should list all products", async () => {
    const products = [
      {
        title: "title1",
        description: "description1",
        imageURL: "image",
        price: 10,
        supplierId: "1",
      },
      {
        title: "title2",
        description: "description2",
        imageURL: "image",
        price: 10,
        supplierId: "2",
      },
    ] as ICreateProductDTO[];

    await createProductUseCase.execute(products[0]);
    await createProductUseCase.execute(products[1]);

    const productsList = await listProductUseCase.execute();

    expect(productsList.map((item) => item.title).toString()).toBe(
      products.map((item) => item.title).toString()
    );
  });

  it("should list only accounts products", async () => {
    const products = [
      {
        title: "title1",
        description: "description1",
        imageURL: "image",
        price: 10,
        supplierId: "1",
      },
      {
        title: "title2",
        description: "description2",
        imageURL: "image",
        price: 10,
        supplierId: "2",
      },
    ] as ICreateProductDTO[];

    await createProductUseCase.execute(products[0]);
    await createProductUseCase.execute(products[1]);

    const productsList = await listProductUseCase.execute("asc", "1");

    expect(productsList.map((item) => item.title).toString()).toBe(
      [products[0].title].toString()
    );
  });

  it("should list products in desc order", async () => {
    const products = [
      {
        title: "title1",
        description: "description1",
        imageURL: "image",
        price: 10,
        supplierId: "1",
      },
      {
        title: "title2",
        description: "description2",
        imageURL: "image",
        price: 10,
        supplierId: "2",
      },
    ] as ICreateProductDTO[];

    await createProductUseCase.execute(products[0]);
    await createProductUseCase.execute(products[1]);

    const productsList = await listProductUseCase.execute("desc");

    expect(productsList.map((item) => item.title).toString()).toBe(
      products
        .map((item) => item.title)
        .reverse()
        .toString()
    );
  });
});
