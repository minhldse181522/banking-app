import { AccountType, AccountStatus, CardType } from '@prisma/client';

export class BankingAccountEntity {
  constructor(
    public readonly userId: bigint,
    public readonly cardNumber: string,
    public readonly accountType: AccountType,
    public readonly accountStatus: AccountStatus = 'ACTIVE',
    public readonly cardType: CardType,
    public readonly currencyId: bigint,
    public readonly balance: number = 0,
    public readonly freezeReason?: string | null,
    public readonly createdBy?: string | null,
  ) {}
}
