import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAccountUseCase } from "./GetAccountUseCase";

export class GetAccountController {
  async execute(req: Request, res: Response) {
    const { accountId } = req.account;

    const getAccount = container.resolve(GetAccountUseCase);

    const account = await getAccount.execute(accountId);

    return res.status(200).send(account);
  }
}
