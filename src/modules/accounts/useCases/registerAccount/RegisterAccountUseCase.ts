import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { IRegisterAccountDTO } from "../../dtos/IRegisterAccountDTO";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";
import { AppError } from "../../../../shared/error/AppError";
import { AccountMap } from "../../mapper/AccountMap";

@injectable()
export class RegisterAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({ name, email, password }: IRegisterAccountDTO) {
    const accountAlreadyExists = await this.accountsRepository.findByEmail(
      email
    );

    if (accountAlreadyExists) {
      throw new AppError("Account already exists", 422);
    }

    const passwordHash = await hash(password, 8);

    const account = await this.accountsRepository.create({
      email,
      name,
      password: passwordHash,
    });

    return AccountMap.toDTO(account);
  }
}
