import { Account } from "@prisma/client";

export class AccountMap {
  static toDTO({ id, email, name, updatedAt, createdAt }: Account) {
    const account = {
      email,
      name,
      id,
      updatedAt,
      createdAt,
    };

    return account;
  }
}
