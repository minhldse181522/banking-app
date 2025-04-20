// src/modules/auth/presentation/mapper/user.mapper.ts
import { UserEntity } from '../../domain/entity/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';

export function mapToUserResponseDto(user: UserEntity): UserResponseDto {
  return {
    keycloakId: user.keycloakId,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    bod: user.bod,
    createdBy: user.createdBy,
  };
}
