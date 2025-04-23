import { Injectable } from '@nestjs/common';
import { Currency as CurrencyModel } from '@prisma/client';
import { CurrencyEntity } from '../../domain/entity/currency.entity';
import { CurrencyResponseDto } from '../../presentation/dto/response/currency.response.dto';

@Injectable()
export class CurrencyMapper {
  static toPersistence(entity: CurrencyEntity): Omit<CurrencyModel, 'id'> {
    return {
      code: entity.code,
      name: entity.name,
      rateToBase: entity.rateToBase,
      createdAt: new Date(),
      createdBy: entity.createdBy || null,
      updatedAt: new Date(),
      updatedBy: entity.updatedBy || null,
    };
  }

  static toDomain(model: CurrencyModel): CurrencyEntity {
    return new CurrencyEntity(
      model.code,
      model.name,
      model.rateToBase,
      model.createdAt,
      model.createdBy,
      model.updatedAt,
      model.updatedBy,
      model.id.toString(),
    );
  }

  static toResponse(entity: CurrencyEntity): CurrencyResponseDto {
    return new CurrencyResponseDto({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      rateToBase: entity.rateToBase,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      updatedAt: entity.updatedAt,
      updatedBy: entity.updatedBy,
    });
  }
}
