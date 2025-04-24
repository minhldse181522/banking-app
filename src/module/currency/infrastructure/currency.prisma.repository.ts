import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.config';
import { CurrencyMapper } from '../application/mapper/currency.mapper';
import { CurrencyEntity } from '../domain/entity/currency.entity';
import { CurrencyRepositoryPort } from '../domain/repository/currency.repository';

@Injectable()
export class PrismaCurrencyRepository implements CurrencyRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getCurrency(): Promise<CurrencyEntity[]> {
    const currencies = await this.prismaService.currency.findMany();
    return currencies.map(CurrencyMapper.toDomain);
  }

  async createCurrency(entity: CurrencyEntity): Promise<CurrencyEntity[]> {
    const data = CurrencyMapper.toPersistence(entity);
    const created = await this.prismaService.currency.create({ data });
    return [CurrencyMapper.toDomain(created)];
  }
}
