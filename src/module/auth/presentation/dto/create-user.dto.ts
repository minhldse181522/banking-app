import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'The keycloak Id',
  })
  @IsString()
  keycloakId: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Full Name',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Full Name',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Phone Number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Birth of date',
  })
  @IsDateString()
  bod: Date;

  @ApiPropertyOptional({
    example: 'Admin',
    description: 'created by',
  })
  @IsString()
  createdBy?: string;
}
