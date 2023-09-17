import { Request, Response } from "express";
import { container } from "tsyringe";

import { RegisterAccountUseCase } from "./RegisterAccountUseCase";

export class RegisterAccountController {
  async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const registerAccount = container.resolve(RegisterAccountUseCase);

    const account = await registerAccount.execute({
      name,
      email,
      password,
    });

    return res.status(201).send(account);
  }
}
