import { AppError } from "../../../../shared/error/AppError";
import { InMemoryAccountsRepository } from "../../repositories/inMemory/inMemoryAccountsRepository";

import { RegisterAccountUseCase } from "../registerAccount/RegisterAccountUseCase";

import { LoginAccountUseCase } from "./LoginAccountUseCase";

let accountsRepositoryInMemory: InMemoryAccountsRepository;
let registerAccountUseCase: RegisterAccountUseCase;
let loginAccountUseCase: LoginAccountUseCase;

describe("Login Account", () => {
  beforeEach(() => {
    accountsRepositoryInMemory = new InMemoryAccountsRepository();
    registerAccountUseCase = new RegisterAccountUseCase(
      accountsRepositoryInMemory
    );
    loginAccountUseCase = new LoginAccountUseCase(accountsRepositoryInMemory);
  });

  it("should be able to login", async () => {
    const user = {
      name: "Tester",
      email: "test@example.com",
      password: "test",
    };

    await registerAccountUseCase.execute(user);

    const response = await loginAccountUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to login when an account not exists", () => {
    expect(async () => {
      await loginAccountUseCase.execute({
        email: "notexists@email.com",
        password: "notexists",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to login when password is wrong", async () => {
    expect(async () => {
      const user = {
        name: "Tester",
        email: "test@example.com",
        password: "test",
      };

      await registerAccountUseCase.execute(user);

      await loginAccountUseCase.execute({
        email: user.email,
        password: "wrong",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
