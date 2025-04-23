import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BankingAccountRepositoryPort } from '../../domain/repository/banking-account.repository';
import { BANKING_CARD_REPOSITORY } from '../../banking_card.di.tokens';
import { BankingAccountEntity } from '../../domain/entity/banking-account.entity';
import { CreateBankingAccountRequestDto } from '../dto/create-banking-account.request.dto';

@Injectable()
export class CreateBankingAccountUseCase {
  constructor(
    @Inject(BANKING_CARD_REPOSITORY)
    private readonly bankingAccountRepository: BankingAccountRepositoryPort,
  ) {}

  async execute(
    dto: CreateBankingAccountRequestDto,
  ): Promise<BankingAccountEntity> {
    const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!cardNumberRegex.test(dto.cardNumber)) {
      throw new BadRequestException(
        'Card Number must be in format XXXX-XXXX-XXXX-XXXX',
      );
    }
    const newBankingAccount = new BankingAccountEntity(
      dto.userId,
      dto.cardNumber,
      dto.accountType,
      'ACTIVE',
      dto.cardType,
      dto.currencyId,
      0,
      dto.frezzeReason,
      dto.createdBy,
    );
    return this.bankingAccountRepository.createBankingAccount(
      newBankingAccount,
    );
  }
}
