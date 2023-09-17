import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../../../../config/auth";

import { ILoginAccountResponseDTO } from "../../dtos/ILoginResponseDTO";

import { IAccountsRepository } from "../../repositories/IAccountsRepository";
import { AppError } from "../../../../shared/error/AppError";
import { AccountMap } from "../../mapper/AccountMap";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class LoginAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<ILoginAccountResponseDTO> {
    const account = await this.accountsRepository.findByEmail(email);

    if (!account) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordMatch = await compare(password, account.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const { secretToken, expiresIn } = authConfig.jwt;

    const token = sign({ account }, secretToken, {
      subject: account.id,
      expiresIn: expiresIn,
    });

    return {
      account: AccountMap.toDTO(account),
      token,
    };
  }
}
