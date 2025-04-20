import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/repository/user.repository';
import { KeycloakService } from '../../infrastructure/keycloak.service';
import { LoginUserRequestDto } from '../../presentation/dto/login-user.dto';
import { UserResponseDto } from '../../presentation/dto/user.response.dto';
import { mapToUserResponseDto } from '../../presentation/mapper/user.mapper';
import { USER_REPOSITORY } from '../../auth.di.tokens';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly keycloakService: KeycloakService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: LoginUserRequestDto): Promise<{
    user: UserResponseDto;
    access_token: string;
    refresh_token: string;
  }> {
    const tokenResponse = await this.keycloakService.login(dto);

    const payload = this.keycloakService.decodeToken(
      tokenResponse.access_token,
    );
    if (!payload) {
      throw new Error('Invalid token: Unable to decode.');
    }
    const user = await this.userRepository.findByKeyCloakId(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found in system');
    }

    return {
      user: mapToUserResponseDto(user),
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
    };
  }
}
