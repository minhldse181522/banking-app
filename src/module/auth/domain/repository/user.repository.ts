import { UserEntity } from '../entity/user.entity';

export interface UserRepository {
  findByKeyCloakId(keycloakId: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
}
