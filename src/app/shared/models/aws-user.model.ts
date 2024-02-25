export class AwsCognitoUser {
  constructor(
    public sub: string,
    public email: string,
    public email_verified: boolean,
    public given_name: string,
    public family_name: string,
    public cognitoUsername: string
  ) {}

  get firstName() {
    return this.given_name;
  }

  get lastName() {
    return this.family_name;
  }

  get fullName() {
    return `${this.given_name} ${this.family_name}`;
  }
}
