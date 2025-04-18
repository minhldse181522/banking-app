import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ValidateUserUseCase } from '../../application/use-cases/validate-user.usecase';
import { CurrentUser } from '../decorator/current-user.decorator';
import { KeyCloakAuthGuard } from '../guard/keycloak-auth.guard';
import { UserEntity } from '../../domain/entity/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { CreateUserRequestDto } from '../dto/create-user.dto';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';

@ApiTags('User')
@Controller('user')
export class AuthController {
  constructor(
    private readonly ValidateUser: ValidateUserUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @UseGuards(KeyCloakAuthGuard)
  @Get()
  async getUser(@CurrentUser() user: User): Promise<UserEntity | null> {
    return this.ValidateUser.execute(user.keycloakId);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  async createNewUser(@Body() dto: CreateUserRequestDto): Promise<{
    message: string;
    data: CreateUserResponseDto;
  }> {
    const user = await this.createUser.execute(dto);
    return {
      message: 'User created successfully',
      data: user,
    };
  }
}
