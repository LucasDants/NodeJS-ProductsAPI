import { Product } from "@prisma/client";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

export interface IProductsRepository {
  get: (productId: string) => Promise<Product | null>;
  list: (order?: "asc" | "desc", accountId?: string) => Promise<Product[]>;
  create: (data: ICreateProductDTO) => Promise<Product>;
  put: (productId: string, data: ICreateProductDTO) => Promise<Product>;
  delete: (productId: string, accountId: string) => Promise<Product>;
}
