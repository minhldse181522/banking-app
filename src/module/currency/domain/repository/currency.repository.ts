import { CurrencyEntity } from '../entity/currency.entity';

export interface CurrencyRepositoryPort {
  getCurrency(): Promise<CurrencyEntity[]>;
}
