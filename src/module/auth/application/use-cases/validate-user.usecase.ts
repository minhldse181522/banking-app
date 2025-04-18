import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../auth.di.tokens';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserRepository } from '../../domain/repository/user.repository';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(keycloakId: string): Promise<UserEntity | null> {
    return this.userRepo.findByKeyCloakId(keycloakId);
  }
}
