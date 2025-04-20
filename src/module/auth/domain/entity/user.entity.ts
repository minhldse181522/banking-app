export class UserEntity {
  constructor(
    public readonly keycloakId: string,
    public readonly userName: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly bod: Date,
    public readonly createdBy?: string | null,
  ) {}

  static create(props: {
    keycloakId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bod: Date;
    createdBy?: string | null;
  }): UserEntity {
    return new UserEntity(
      props.keycloakId,
      props.userName,
      props.firstName,
      props.lastName,
      props.email,
      props.phone,
      props.bod,
      props.createdBy,
    );
  }
}
