import { Product } from "@prisma/client";

import { IProductsRepository } from "../IProductsRepository";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

export class InMemoryProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  async get(productId: string) {
    const product = this.products.find(
      (product) => product.id === productId
    ) as Product;

    return product;
  }

  async list(order?: "asc" | "desc", accountId?: string) {
    let products = this.products;

    if (order === "desc") {
      products = this.products.reverse();
    }

    if (accountId != null) {
      products = this.products.filter((item) => item.supplierId === accountId);
    }

    return products;
  }

  async create(data: ICreateProductDTO) {
    const product = {
      ...data,
      id: String(this.products.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  async put(productId: string, data: ICreateProductDTO) {
    let updatedProduct = {} as Product;
    const products = this.products.map((item) => {
      if (item.id === productId) {
        const newProduct = { ...item, ...data, updatedAt: new Date() };
        updatedProduct = newProduct;
        return newProduct;
      }

      return item;
    });

    this.products = products;

    return updatedProduct;
  }

  async delete(productId: string, accountId: string) {
    const products = this.products.filter(
      (item) => item.id !== productId && item.supplierId !== accountId
    );
    this.products = products;

    return this.products.find(
      (item) => item.id !== productId && item.supplierId !== accountId
    ) as Product;
  }
}
