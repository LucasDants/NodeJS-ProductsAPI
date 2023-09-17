import { Account } from "@prisma/client";
import { IRegisterAccountDTO } from "../../dtos/IRegisterAccountDTO";

import { IAccountsRepository } from "../IAccountsRepository";

export class InMemoryAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  async findByEmail(email: string): Promise<Account | null> {
    return this.accounts.find((account) => account.email === email) as Account;
  }

  async findById(accountId: string): Promise<Account | null> {
    return this.accounts.find((account) => account.id === accountId) as Account;
  }

  async create({
    name,
    email,
    password,
  }: IRegisterAccountDTO): Promise<Account> {
    const account: Account = {
      id: String(this.accounts.length + 1),
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.accounts.push(account);
    return account;
  }
}
