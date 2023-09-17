import { injectable, inject } from "tsyringe";

import { IAccountsRepository } from "../../repositories/IAccountsRepository";
import { AppError } from "../../../../shared/error/AppError";
import { AccountMap } from "../../mapper/AccountMap";

@injectable()
export class GetAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(accountId: string) {
    const account = await this.accountsRepository.findById(accountId);

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    return AccountMap.toDTO(account);
  }
}
