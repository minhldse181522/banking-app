import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../presentation/dto/register-user.dto';
import axios from 'axios';
import { LoginUserRequestDto } from '../presentation/dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { keycloakConfig } from 'src/shared/config/keycloak.config';

@Injectable()
export class KeycloakService {
  private readonly baseUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}`;

  async register(dto: RegisterUserDto): Promise<{ id: string }> {
    const adminUrl = `${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users`;
    const response = await axios.post(
      adminUrl,
      {
        username: dto.userName,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: dto.password,
            temporary: false,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${await this.getAdminToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return { id: response.headers.location.split('/').pop() };
  }

  private async getAdminToken(): Promise<string> {
    const url = `${keycloakConfig.url}/realms/master/protocol/openid-connect/token`;
    const res = await axios.post(
      url,
      new URLSearchParams({
        username: keycloakConfig.username,
        password: keycloakConfig.password,
        grant_type: 'password',
        client_id: 'admin-cli',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return res.data.access_token;
  }

  async login(
    dto: LoginUserRequestDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const res = await axios.post(
      `${this.baseUrl}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: keycloakConfig.clientId,
        grant_type: 'password',
        username: dto.userName,
        password: dto.password,
        client_secret: keycloakConfig.clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    return {
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
    };
  }

  decodeToken(token: string): Record<string, any> | null {
    return jwt.decode(token) as Record<string, any> | null;
  }
}
