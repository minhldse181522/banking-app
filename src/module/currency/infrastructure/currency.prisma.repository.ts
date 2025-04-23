import { Injectable } from '@nestjs/common';
import { CurrencyRepositoryPort } from '../domain/repository/currency.repository';
import { PrismaService } from 'src/shared/config/prisma.config';
import { CurrencyEntity } from '../domain/entity/currency.entity';
import { CurrencyMapper } from '../application/mapper/currency.mapper';

@Injectable()
export class PrismaCurrencyRepository implements CurrencyRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getCurrency(): Promise<CurrencyEntity[]> {
    const currencies = await this.prismaService.currency.findMany();
    return currencies.map(CurrencyMapper.toDomain);
  }
}
