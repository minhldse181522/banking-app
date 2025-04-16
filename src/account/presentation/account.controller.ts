import { Controller, Post, Body } from '@nestjs/common';
import { CreateAccountUseCase } from '../application/use-cases/create-account.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async create(@Body() body: { ownerId: string }): Promise<{
    message: string;
    data: {
      id: bigint | undefined;
      balance: number;
    };
  }> {
    const account = await this.createAccountUseCase.execute(body.ownerId);
    return {
      message: 'Account created successfully',
      data: {
        id: account.id,
        balance: account.getBalance(),
      },
    };
  }
}
