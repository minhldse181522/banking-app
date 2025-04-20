import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.config';
import { UserRepository } from '../../domain/repository/user.repository';
import { UserEntity } from '../../domain/entity/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByKeyCloakId(keycloakId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { keycloakId },
    });

    if (!user) return null;

    return new UserEntity(
      user.keycloakId,
      user.userName,
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.bod,
      user.createdBy,
    );
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const saved = await this.prisma.user.create({
      data: {
        keycloakId: user.keycloakId,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bod: user.bod,
        createdBy: user.createdBy,
      },
    });

    return new UserEntity(
      saved.keycloakId,
      saved.userName,
      saved.firstName,
      saved.lastName,
      saved.email,
      saved.phone,
      saved.bod,
      saved.createdBy,
    );
  }
}
