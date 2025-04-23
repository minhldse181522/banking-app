import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum AccountType {
  SAVINGS = 'SAVINGS',
  PAYMENT = 'PAYMENT',
  LOAN = 'LOAN',
}

export enum CardType {
  ATM = 'ATM',
  VISA = 'VISA',
  MASTER = 'MASTER',
}

export class CreateBankingAccountRequestDto {
  @ApiProperty({
    example: '1',
    description: 'userID',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'XXXX-XXXX-XXXX-XXXX',
    description: 'Card Number',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    example: 'SAVINGS',
    description: 'Account Type',
    enum: AccountType,
  })
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({
    example: 'VISA',
    description: 'Card Type',
    enum: CardType,
  })
  @IsEnum(CardType)
  @IsNotEmpty()
  cardType: CardType;

  @ApiProperty({
    example: '1',
    description: 'currency ID',
  })
  @IsNotEmpty()
  currencyId: string;

  @ApiPropertyOptional({
    description: 'Freeze Reason',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  frezzeReason?: string | null;

  @ApiPropertyOptional({
    description: 'Created By',
  })
  @IsString()
  @MaxLength(36)
  @IsOptional()
  createdBy?: string | null;
}
