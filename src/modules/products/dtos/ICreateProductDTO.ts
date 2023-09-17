import { Product } from "@prisma/client";

export type ICreateProductDTO = Pick<
  Product,
  "title" | "description" | "imageURL" | "price" | "supplierId"
>;
