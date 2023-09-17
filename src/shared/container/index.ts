import { container } from "tsyringe";

import { AccountsRepository } from "../../modules/accounts/repositories/AccountsRepository";
import { IAccountsRepository } from "../../modules/accounts/repositories/IAccountsRepository";
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository";
import { ProductsRepository } from "../../modules/products/repositories/ProductsRepository";

container.registerSingleton<IAccountsRepository>(
  "AccountsRepository",
  AccountsRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);
