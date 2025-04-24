import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CURRENCY_REPOSITORY } from '../../currency.di.tokens';
import { CurrencyEntity } from '../../domain/entity/currency.entity';
import { CurrencyRepositoryPort } from '../../domain/repository/currency.repository';
import { CreateCurrencyCommand } from '../commands/create-currency.command';
import { CurrencyMapper } from '../mapper/currency.mapper';

@Injectable()
@CommandHandler(CreateCurrencyCommand)
export class CreateCurrencyUseCase {
  constructor(
    @Inject(CURRENCY_REPOSITORY)
    private readonly currencyRepo: CurrencyRepositoryPort,
  ) {}

  async execute(command: CreateCurrencyCommand): Promise<CurrencyEntity[]> {
    const entity = new CurrencyEntity(
      command.code,
      command.name,
      command.rateToBase,
      command.createdAt ?? new Date(),
      command.createdBy,
      command.updatedAt ?? null,
      command.updatedBy ?? null,
    );
    const newCurrencies = await this.currencyRepo.createCurrency(entity);
    return newCurrencies.map(CurrencyMapper.toResponse);
  }
}
