import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'The keycloak Id',
  })
  keycloakId: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Full Name',
  })
  fullName: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Full Name',
  })
  email: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Phone Number',
  })
  phone: string;

  @ApiProperty({
    description: 'Birth of date',
  })
  bod: Date;

  @ApiPropertyOptional({
    example: 'Admin',
    description: 'created by',
  })
  createdBy?: string;
}
