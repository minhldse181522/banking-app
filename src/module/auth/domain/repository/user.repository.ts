import { UserEntity } from '../entity/user.entity';

export interface UserRepository {
  findByKeyCloakId(keycloakId: string): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
}
