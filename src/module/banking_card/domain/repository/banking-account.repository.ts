import { BankingAccountEntity } from '../entity/banking-account.entity';

export interface BankingAccountRepositoryPort {
  createBankingAccount(
    account: BankingAccountEntity,
  ): Promise<BankingAccountEntity>;
}
