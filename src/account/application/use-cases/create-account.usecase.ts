import { Inject, Injectable } from '@nestjs/common';
import { BankAccount } from 'src/account/domain/entity/account.entity';
import { AccountRepository } from 'src/account/domain/repository/account.repository';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute(ownerId: string): Promise<BankAccount> {
    const account = new BankAccount(ownerId, 0);
    return await this.accountRepo.saveAccount(account);
  }
}
