import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../auth.di.tokens';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserRepository } from '../../domain/repository/user.repository';
import { CreateUserRequestDto } from '../../presentation/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: CreateUserRequestDto): Promise<UserEntity> {
    const user = new UserEntity(
      dto.keycloakId,
      dto.fullName,
      dto.email,
      dto.phone,
      dto.bod,
    );
    return await this.userRepo.createUser(user);
  }
}
