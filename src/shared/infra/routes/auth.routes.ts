import { LoginAccountController } from "../../../modules/accounts/useCases/loginAccount/LoginAccountController";
import { RegisterAccountController } from "../../../modules/accounts/useCases/registerAccount/RegisterAccountController";
import { Router } from "express";

const authRouter = Router();

const loginAccountController = new LoginAccountController();
const registerAccountController = new RegisterAccountController();

authRouter.post("/login", loginAccountController.execute);
authRouter.post("/register", registerAccountController.execute);

export { authRouter };
