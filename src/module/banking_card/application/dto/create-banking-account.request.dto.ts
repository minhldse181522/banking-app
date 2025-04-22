import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum AccountType {
  SAVINGS = 'SAVINGS',
  PAYMENT = 'PAYMENT',
  LOAN = 'LOAN',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
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
  userId: bigint;

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
    example: 'ACTIVE',
    description: 'Account Status',
    enum: AccountStatus,
  })
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  accountStatus: AccountStatus;

  @ApiProperty({
    example: 'VISA',
    description: 'Card Type',
    enum: CardType,
  })
  @IsEnum(CardType)
  @IsNotEmpty()
  cardType: CardType;

  @ApiProperty({
    example: 1,
    description: 'currency ID',
  })
  @IsNotEmpty()
  currencyId: bigint;

  @ApiProperty({
    example: '0',
    description: 'Balance',
  })
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @ApiPropertyOptional({
    example: 'ABC',
    description: 'Freeze Reason',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  frezzeReason?: string | null;

  @ApiPropertyOptional({
    example: 'Mile',
    description: 'Created By',
  })
  @IsString()
  @MaxLength(36)
  @IsOptional()
  createdBy?: string | null;
}
