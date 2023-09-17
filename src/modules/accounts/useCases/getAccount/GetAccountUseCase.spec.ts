import { AppError } from "../../../../shared/error/AppError";
import { InMemoryAccountsRepository } from "../../repositories/inMemory/inMemoryAccountsRepository";

import { RegisterAccountUseCase } from "../registerAccount/RegisterAccountUseCase";
import { GetAccountUseCase } from "./GetAccountUseCase";

let accountsRepositoryInMemory: InMemoryAccountsRepository;
let registerAccountUseCase: RegisterAccountUseCase;
let getAccountUseCase: GetAccountUseCase;

describe("Get Account", () => {
  beforeEach(() => {
    accountsRepositoryInMemory = new InMemoryAccountsRepository();
    registerAccountUseCase = new RegisterAccountUseCase(
      accountsRepositoryInMemory
    );
    getAccountUseCase = new GetAccountUseCase(accountsRepositoryInMemory);
  });

  it("should be able to show an account profile", async () => {
    const user = {
      name: "Tester",
      email: "test@example.com",
      password: "test",
    };

    const accountCreated = await registerAccountUseCase.execute(user);

    const accountProfile = await getAccountUseCase.execute(
      accountCreated.id as string
    );

    expect(accountProfile).toHaveProperty("id");
  });

  it("should not be able to show a profile when an account not exists", async () => {
    expect(async () => {
      await getAccountUseCase.execute("notexistsid");
    }).rejects.toBeInstanceOf(AppError);
  });
});
