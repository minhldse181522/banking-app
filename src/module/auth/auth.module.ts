// src/module/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs'; // nếu có dùng
import { PrismaService } from 'src/shared/config/prisma.config';
import { JwtKeycloakStrategy } from './infrastructure/strategy/keycloak.strategy';
import { ValidateUserUseCase } from './application/use-cases/validate-user.usecase';
import { KeyCloakAuthGuard } from './presentation/guard/keycloak-auth.guard';
import { AuthController } from './presentation/controller/auth.controller';
import { PrismaUserRepository } from './domain/repository/user.prisma.repository';
import { USER_REPOSITORY } from './auth.di.tokens';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';

const httpControllers = [AuthController];

// CLI or Messaging Controllers (nếu có)
const cliControllers = [];
const messageControllers = [];

// Use cases
const commandHandlers = [ValidateUserUseCase, CreateUserUseCase];
const queryHandlers = []; // nếu có query use-cases

// Services (Infrastructure)
const services = [];

// Strategy, Guard, etc.
const authSecurity = [JwtKeycloakStrategy, KeyCloakAuthGuard];

// Repositories (nếu có dùng DI token)
const repositories = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
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
export class AuthModule {}
