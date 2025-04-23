import { Prisma } from '@prisma/client';

export class CurrencyEntity {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly rateToBase: Prisma.Decimal,
    public readonly createdAt: Date,
    public readonly createdBy?: string | null,
    public readonly updatedAt?: Date | null,
    public readonly updatedBy?: string | null,
    public readonly id?: string,
  ) {}
}
