import { IProductsRepository } from "./IProductsRepository";

import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

import prismaClient from "../../../database";

export class ProductsRepository implements IProductsRepository {
  async get(productId: string) {
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    return product;
  }

  async list(order?: "asc" | "desc", accountId?: string) {
    const products = await prismaClient.product.findMany({
      orderBy: { updatedAt: order },
      where: {
        supplierId: accountId,
      },
    });

    return products;
  }

  async create(data: ICreateProductDTO) {
    const product = prismaClient.product.create({
      data,
    });

    return product;
  }

  async put(productId: string, data: ICreateProductDTO) {
    const product = await prismaClient.product.update({
      where: {
        id: productId,
        supplierId: data.supplierId,
      },
      data: {
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
        updatedAt: new Date(),
        price: data.price,
      },
    });

    return product;
  }

  async delete(productId: string, accountId: string) {
    const product = await prismaClient.product.delete({
      where: {
        id: productId,
        supplierId: accountId,
      },
    });

    return product;
  }
}
