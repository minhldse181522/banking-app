import { AccountType, AccountStatus, CardType } from '@prisma/client';

export class BankingAccountEntity {
  constructor(
    public readonly userId: string,
    public readonly cardNumber: string,
    public readonly accountType: AccountType,
    public readonly accountStatus: AccountStatus,
    public readonly cardType: CardType,
    public readonly currencyId: string,
    public readonly balance: number,
    public readonly freezeReason?: string | null,
    public readonly createdBy?: string | null,
  ) {}
}
