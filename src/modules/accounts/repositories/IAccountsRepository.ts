import { Account } from "@prisma/client";
import { IRegisterAccountDTO } from "../dtos/IRegisterAccountDTO";

export interface IAccountsRepository {
  create: (data: IRegisterAccountDTO) => Promise<Account>;
  findByEmail: (email: string) => Promise<Account | null>;
  findById: (AccountId: string) => Promise<Account | null>;
}
