import { decodeJWT } from 'aws-amplify/auth';
import awsExports from '../../../aws-exports';
import { AwsCognitoUser } from '../models/aws-user.model';

export function getAwsCognitoUserFromToken(): AwsCognitoUser | null {
  const store = window.localStorage;
  const lastAuthUser = store.getItem(
    `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.LastAuthUser`
  );

  if (lastAuthUser) {
    const idToken = store.getItem(
      `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.${lastAuthUser}.idToken`
    ) as string;

    const decodedIdToken = decodeJWT(idToken);
    const tokenPayload = decodedIdToken.payload;

    return new AwsCognitoUser(
      tokenPayload['sub'] as string,
      tokenPayload['email'] as string,
      tokenPayload['email_verified'] as boolean,
      tokenPayload['given_name'] as string,
      tokenPayload['family_name'] as string,
      tokenPayload['cognitoUsername'] as string
    );
  }

  return null;
}
