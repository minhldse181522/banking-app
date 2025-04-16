import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequestDto {
  @ApiProperty({
    example: 'user_123',
    description: 'The ID of the account owner',
  })
  ownerId: string;
}
