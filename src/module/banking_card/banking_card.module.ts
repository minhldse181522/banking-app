import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/shared/config/prisma.config';
import { CreateBankingAccountUseCase } from './application/use-cases/create-banking-account.usecase';
import { BANKING_CARD_REPOSITORY } from './banking_card.di.tokens';
import { PrismaBankingAccountRepository } from './infrastructure/banking-account.prisma.repository';
import { BankingAccountController } from './presentation/controller/banking-account.controller';

const httpControllers = [BankingAccountController];

// CLI or Messaging Controllers (nếu có)
const cliControllers = [];
const messageControllers = [];

// Use cases
const commandHandlers = [CreateBankingAccountUseCase];
const queryHandlers = []; // nếu có query use-cases

// Services (Infrastructure)
const services = [];

// Strategy, Guard, etc.
const authSecurity = [];

// Repositories (nếu có dùng DI token)
const repositories = [
  {
    provide: BANKING_CARD_REPOSITORY,
    useClass: PrismaBankingAccountRepository,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers, ...cliControllers, ...messageControllers],
  providers: [
    PrismaService,
    ...authSecurity,
    ...services,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class BankingAccountModule {}
