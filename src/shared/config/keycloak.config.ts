import '../utils/dotenv';
import { get } from 'env-var';

export const keycloakConfig = {
  url: get('KEYCLOAK_URL').required().asString(),
  realm: get('KEYCLOAK_REALM').required().asString(),
  clientId: get('KEYCLOAK_CLIENT_ID').required().asString(),
  clientSecret: get('KEYCLOAK_CLIENT_SECRET').required().asString(),
  //   dùng khi bạn muốn xác thực token bằng Public Key (RS256) thay vì thông qua introspection.
  //   Đây là cách dùng Keycloak ở chế độ không phải confidential, ví dụ ứng dụng public frontend (SPA).
  //   jwtSecretCert: get('KEYCLOAK_JWT_CERTIFICATE').asString(),
  username: get('KEYCLOAK_ADMIN_USERNAME').required().asString(),
  password: get('KEYCLOAK_ADMIN_PASSWORD').required().asString(),
};
