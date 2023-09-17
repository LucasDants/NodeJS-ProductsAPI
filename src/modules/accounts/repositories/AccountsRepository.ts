import { IAccountsRepository } from "./IAccountsRepository";
import prismaClient from "../../../database/index";
import { Account } from "@prisma/client";
import { IRegisterAccountDTO } from "../dtos/IRegisterAccountDTO";

export class AccountsRepository implements IAccountsRepository {
  async findByEmail(email: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    return account;
  }

  async findById(accountId: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId },
    });

    return account;
  }

  async create({
    name,
    email,
    password,
  }: IRegisterAccountDTO): Promise<Account> {
    const account = await prismaClient.account.create({
      data: { name, email, password },
    });

    return account;
  }
}
