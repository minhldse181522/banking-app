import { BankAccount } from '../entity/account.entity';

export interface AccountRepository {
  findById(id: bigint): Promise<BankAccount | null>;
  saveAccount(account: BankAccount): Promise<BankAccount>;
}
