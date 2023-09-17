import { Request, Response } from "express";
import { container } from "tsyringe";

import { LoginAccountUseCase } from "./LoginAccountUseCase";

export class LoginAccountController {
  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginAccount = container.resolve(LoginAccountUseCase);

    const { account, token } = await loginAccount.execute({
      email,
      password,
    });

    return res.status(200).send({ account, token });
  }
}
