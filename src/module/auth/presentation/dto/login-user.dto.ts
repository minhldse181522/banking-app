import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({
    example: 'usertest',
    description: 'user name',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '123',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
