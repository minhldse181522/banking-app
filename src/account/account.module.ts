import { Module } from '@nestjs/common';
import { AccountController } from './presentation/controller/account.controller';
import { PrismaAccountRepository } from './domain/repository/account.prisma.repository';
import { CreateAccountUseCase } from './application/use-cases/create-account.usecase';
import { PrismaService } from './infrastructure/prisma.service';

@Module({
  controllers: [AccountController],
  providers: [
    PrismaService,
    CreateAccountUseCase,
    {
      provide: 'AccountRepository',
      useClass: PrismaAccountRepository,
    },
  ],
})
export class AccountModule {}
