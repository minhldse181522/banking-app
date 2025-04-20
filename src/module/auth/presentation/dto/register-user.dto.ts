import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'user',
    description: 'First Name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'test',
    description: 'Last Name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Full Name',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Phone number',
  })
  @IsDateString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Birth of date',
  })
  @IsDateString()
  @IsNotEmpty()
  bod: Date;

  @ApiPropertyOptional({
    example: 'Admin',
    description: 'created by',
  })
  @IsString()
  @IsOptional()
  createdBy?: string;
}
