// src/module/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs'; // nếu có dùng
import { PrismaService } from 'src/shared/config/prisma.config';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { USER_REPOSITORY } from './auth.di.tokens';
import { PrismaUserRepository } from './domain/repository/user.prisma.repository';
import { JwtKeycloakStrategy } from './infrastructure/strategy/keycloak.strategy';
import { AuthController } from './presentation/controller/auth.controller';
import { KeyCloakAuthGuard } from './presentation/guard/keycloak-auth.guard';
import { KeycloakService } from './infrastructure/keycloak.service';

const httpControllers = [AuthController];

// CLI or Messaging Controllers (nếu có)
const cliControllers = [];
const messageControllers = [];

// Use cases
const commandHandlers = [RegisterUserUseCase, LoginUserUseCase];
const queryHandlers = []; // nếu có query use-cases

// Services (Infrastructure)
const services = [KeycloakService];

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
