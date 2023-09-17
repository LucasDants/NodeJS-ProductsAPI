import { Account } from "@prisma/client";

export interface IRegisterAccountDTO
  extends Pick<Account, "name" | "email" | "password"> {}
