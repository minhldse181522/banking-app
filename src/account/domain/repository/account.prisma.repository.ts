import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { BankAccount } from '../entity/account.entity';
import { PrismaService } from 'src/account/infrastructure/prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveAccount(account: BankAccount): Promise<BankAccount> {
    const createdAccount = await this.prisma.account.create({
      data: {
        ownerId: account.ownerId,
        balance: account.getBalance(),
      },
    });

    return new BankAccount(
      createdAccount.ownerId,
      createdAccount.balance,
      BigInt(createdAccount.id),
      createdAccount.createdAt,
    );
  }

  async findById(id: bigint): Promise<BankAccount | null> {
    const data = await this.prisma.account.findUnique({ where: { id } });
    if (!data) return null;
    return new BankAccount(data.ownerId, data.balance, data.id);
  }
}

