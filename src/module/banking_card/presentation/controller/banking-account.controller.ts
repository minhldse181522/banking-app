import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBankingAccountRequestDto } from '../../application/dto/create-banking-account.request.dto';
import { CreateBankingAccountUseCase } from '../../application/use-cases/create-banking-account.usecase';
import { BankingAccountEntity } from '../../domain/entity/banking-account.entity';

@ApiTags('Banking-Account')
@Controller('banking-account')
export class BankingAccountController {
  constructor(
    private readonly createBankingAccount: CreateBankingAccountUseCase,
  ) {}

  @Post()
  createAccount(
    @Body() dto: CreateBankingAccountRequestDto,
  ): Promise<BankingAccountEntity> {
    return this.createBankingAccount.execute(dto);
  }
}
