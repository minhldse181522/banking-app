export class UserEntity {
  constructor(
    public readonly keycloakId: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly bod: Date,
  ) {}
}
