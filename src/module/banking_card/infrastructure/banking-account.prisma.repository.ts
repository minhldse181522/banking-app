import { PrismaService } from 'src/shared/config/prisma.config';
import { BankingAccountRepositoryPort } from './../domain/repository/banking-account.repository';
import { Injectable } from '@nestjs/common';
import { BankingAccountEntity } from '../domain/entity/banking-account.entity';

@Injectable()
export class PrismaBankingAccountRepository
  implements BankingAccountRepositoryPort
{
  constructor(private readonly prismaService: PrismaService) {}

  async createBankingAccount(
    account: BankingAccountEntity,
  ): Promise<BankingAccountEntity> {
    const result = await this.prismaService.bankingAccount.create({
      data: {
        userId: parseInt(account.userId),
        cardNumber: account.cardNumber,
        accountType: account.accountType,
        accountStatus: account.accountStatus,
        cardType: account.cardType,
        currencyId: parseInt(account.currencyId),
        balance: account.balance,
        freezeReason: account.freezeReason,
        createdBy: account.createdBy,
      },
    });
    return new BankingAccountEntity(
      result.userId.toString(),
      result.cardNumber,
      result.accountType,
      result.accountStatus,
      result.cardType,
      result.currencyId.toString(),
      result.balance.toNumber(),
      result.freezeReason,
      result.createdBy,
    );
  }
}
