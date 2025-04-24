import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/shared/config/prisma.config';
import { GetCurrencyUseCase } from './application/use-cases/get-currency.usecase';
import { CURRENCY_REPOSITORY } from './currency.di.tokens';
import { PrismaCurrencyRepository } from './infrastructure/currency.prisma.repository';
import { CurrencyController } from './presentation/controller/currency.controller';
import { CreateCurrencyUseCase } from './application/use-cases/create-currency.usecase';

const httpControllers = [CurrencyController];

// CLI or Messaging Controllers (nếu có)
const cliControllers = [];
const messageControllers = [];

// Use cases
const commandHandlers = [GetCurrencyUseCase, CreateCurrencyUseCase];
const queryHandlers = []; // nếu có query use-cases

// Services (Infrastructure)
const services = [];

// Strategy, Guard, etc.
const authSecurity = [];

// Repositories (nếu có dùng DI token)
const repositories = [
  {
    provide: CURRENCY_REPOSITORY,
    useClass: PrismaCurrencyRepository,
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
export class CurrencyModule {}
