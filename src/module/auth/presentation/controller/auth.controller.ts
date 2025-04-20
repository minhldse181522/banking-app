import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserUseCase } from '../../application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { LoginUserRequestDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserResponseDto } from '../dto/user.response.dto';

@ApiTags('User')
@Controller('user')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<{
    message: string;
    data: UserResponseDto;
  }> {
    const user = await this.registerUser.execute(dto);
    return {
      message: 'User register successfully',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginUserRequestDto): Promise<{
    message: string;
    data: {
      user: UserResponseDto;
      access_token: string;
      refresh_token: string;
    };
  }> {
    const data = await this.loginUser.execute(dto);
    return {
      message: 'User login successfully',
      data,
    };
  }
}
