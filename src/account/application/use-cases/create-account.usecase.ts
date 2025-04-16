import { BankAccount } from 'src/account/domain/entity/account.entity';
import { AccountRepository } from 'src/account/domain/repository/account.repository';

export class CreateAccountUseCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(ownerId: string): Promise<BankAccount> {
    const account = new BankAccount(ownerId, 0);
    await this.accountRepo.saveAccount(account);
    return account;
  }
}
