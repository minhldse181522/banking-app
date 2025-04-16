import { Controller, Post, Body } from '@nestjs/common';
import { CreateAccountUseCase } from '../../application/use-cases/create-account.usecase';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountResponseDto } from '../dto/create-account.response.dto';
import { CreateAccountRequestDto } from '../dto/create-account.request.dto';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @ApiCreatedResponse({ type: CreateAccountResponseDto })
  async create(@Body() body: CreateAccountRequestDto): Promise<{
    message: string;
    data: CreateAccountResponseDto;
  }> {
    const account = await this.createAccountUseCase.execute(body.ownerId);
    return {
      message: 'Account created successfully',
      data: {
        id: account.id?.toString(),
        balance: account.getBalance(),
        createdAt: account.createdAt,
      },
    };
  }
}
