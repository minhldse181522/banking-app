import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/shared/config/prisma.config';
import { UserEntity } from '../entity/user.entity';

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
      user.fullName,
      user.email,
      user.phone,
      user.bod,
    );
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        keycloakId: user.keycloakId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        bod: user.bod,
      },
    });
    return new UserEntity(
      created.keycloakId,
      created.fullName,
      created.email,
      created.phone,
      created.bod,
    );
  }
}
