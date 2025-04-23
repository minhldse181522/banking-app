import { Inject, Injectable } from '@nestjs/common';
import { CURRENCY_REPOSITORY } from '../../currency.di.tokens';
import { CurrencyRepositoryPort } from '../../domain/repository/currency.repository';
import { CurrencyEntity } from '../../domain/entity/currency.entity';
import { CurrencyMapper } from '../mapper/currency.mapper';

@Injectable()
export class GetCurrencyUseCase {
  constructor(
    @Inject(CURRENCY_REPOSITORY)
    private readonly currencyRepository: CurrencyRepositoryPort,
  ) {}

  async execute(): Promise<CurrencyEntity[]> {
    const currencies = await this.currencyRepository.getCurrency();
    const response = currencies.map(CurrencyMapper.toResponse);
    return response;
  }
}
