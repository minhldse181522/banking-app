import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CurrencyResponseDto {
  @ApiHideProperty()
  id?: string;

  @ApiProperty({
    example: 'VND',
    description: 'Mã tiền tệ',
  })
  code: string;

  @ApiProperty({
    example: 'VIỆT NAM ĐỒNG',
    description: 'Tên tiền tệ',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Tỉ giá',
  })
  rateToBase: Prisma.Decimal;

  @ApiProperty({
    example: '',
    description: 'Ngày tạo',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'abc',
    description: 'Người tạo',
  })
  createdBy?: string | null;

  @ApiProperty({
    example: '',
    description: 'Ngày cập nhật',
  })
  updatedAt?: Date | null;

  @ApiProperty({
    example: 'abc',
    description: 'Người cập nhật',
  })
  updatedBy?: string | null;

  constructor(partial: Partial<CurrencyResponseDto>) {
    Object.assign(this, partial);
  }
}
