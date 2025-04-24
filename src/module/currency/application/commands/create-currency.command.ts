import { Prisma } from '@prisma/client';

export class CreateCurrencyCommand {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly rateToBase: Prisma.Decimal,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedBy?: string | null,
    public readonly updatedAt?: Date | null,
  ) {}
}
