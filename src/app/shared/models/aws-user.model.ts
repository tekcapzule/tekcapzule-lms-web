export class AwsCognitoUser {
  constructor(
    public sub: string,
    public email: string,
    public email_verified: boolean,
    public given_name: string,
    public family_name: string,
    public cognito_username: string
  ) {}
}
