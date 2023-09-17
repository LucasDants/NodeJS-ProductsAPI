import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetAccountController } from "../../../modules/accounts/useCases/getAccount/GetAccountController";

const accountRouter = Router();

const getAccountControler = new GetAccountController();

accountRouter.get("/me", ensureAuthenticated, getAccountControler.execute);

export { accountRouter };
