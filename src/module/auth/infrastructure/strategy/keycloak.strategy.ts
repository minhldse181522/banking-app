import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import jwksRsa from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { keycloakConfig } from 'src/shared/config/keycloak.config';
import { Request } from 'express';

@Injectable()
export class JwtKeycloakStrategy extends PassportStrategy(
  Strategy,
  'keycloak',
) {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Missing or invalid authorization header',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const decoded: any = jwt.decode(token, { complete: true });
      const kid = decoded?.header?.kid;

      const client = jwksRsa({
        jwksUri: `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/certs`,
      });

      const key = await client.getSigningKey(kid);
      const publicKey = key.getPublicKey();

      const payload = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      }) as any;
      console.dir(payload, { depth: null });

      return {
        keycloakId: payload.sub,
        email: payload.email,
        fullName: payload.name,
        roles: payload.realm_access?.roles || [],
      };
    } catch (error) {
      console.error('JWT Validation Error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
