import { AppError } from "../../../../shared/error/AppError";
import { InMemoryAccountsRepository } from "../../repositories/inMemory/inMemoryAccountsRepository";

import { RegisterAccountUseCase } from "./RegisterAccountUseCase";

let accountsRepositoryInMemory: InMemoryAccountsRepository;
let registerAccountUseCase: RegisterAccountUseCase;

describe("Register Account", () => {
  beforeEach(() => {
    accountsRepositoryInMemory = new InMemoryAccountsRepository();
    registerAccountUseCase = new RegisterAccountUseCase(
      accountsRepositoryInMemory
    );
  });

  it("should be able to create a new account", async () => {
    const user = {
      name: "Tester",
      email: "test@example.com",
      password: "test",
    };

    const userCreated = await registerAccountUseCase.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new account when account already exists", () => {
    expect(async () => {
      const user = {
        name: "Tester",
        email: "test@example.com",
        password: "test",
      };

      await registerAccountUseCase.execute(user);
      await registerAccountUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
