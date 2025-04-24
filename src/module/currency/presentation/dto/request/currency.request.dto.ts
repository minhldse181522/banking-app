import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCurrencyRequestDto {
  @ApiProperty({
    example: 'USD',
    description: 'Mã tiền tệ',
  })
  @IsNotEmpty()
  @MaxLength(200)
  code: string;

  @ApiProperty({
    example: 'ĐÔ LA MỸ',
    description: 'Tên tiền tệ',
  })
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty({
    example: 200,
    description: 'Tỉ giá chuyển đổi',
  })
  @IsNotEmpty()
  rateToBase: Prisma.Decimal;

  @ApiProperty({
    example: 'admin',
    description: 'Tỉ giá chuyển đổi',
  })
  @IsNotEmpty()
  createdBy: string;
}
