import { Inject, Injectable } from '@nestjs/common';
import { KeycloakService } from '../../infrastructure/keycloak.service';
import { UserRepository } from '../../domain/repository/user.repository';
import { UserEntity } from '../../domain/entity/user.entity';
import { RegisterUserDto } from '../../presentation/dto/register-user.dto';
import { USER_REPOSITORY } from '../../auth.di.tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly keycloakService: KeycloakService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: RegisterUserDto): Promise<Omit<UserEntity, 'password'>> {
    // 1. Tạo user trên Keycloak
    const keycloakUser = await this.keycloakService.register(dto);

    // 2. Lưu vào DB nội bộ
    const user = UserEntity.create({
      keycloakId: keycloakUser.id,
      userName: dto.userName,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      bod: dto.bod,
      createdBy: dto.createdBy,
    });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
