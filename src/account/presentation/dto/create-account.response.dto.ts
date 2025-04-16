import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountResponseDto {
  @ApiProperty({
    example: '1',
  })
  id: string | undefined;

  @ApiProperty({ example: 0 })
  balance: number;

  @ApiProperty()
  createdAt: Date | undefined;
}
