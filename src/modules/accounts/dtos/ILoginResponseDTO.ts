import { Account } from "@prisma/client";

export interface ILoginAccountResponseDTO {
  token: string;
  account: Pick<Account, "id" | "name" | "email">;
}
