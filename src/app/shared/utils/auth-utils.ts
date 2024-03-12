import { AuthState, AuthStateService } from '@app/core/services';
import { decodeJWT } from 'aws-amplify/auth';
import awsExports from '../../../aws-exports';
import { AwsCognitoUser } from '../models/aws-user.model';

const TekCapsuleLastAuthStateKey = `TekCapzule.${awsExports.aws_user_pools_web_client_id}.LastAuthState`;

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
      tokenPayload['cognito:username'] as string
    );
  }

  return null;
}

export function getAccessTokenFromStore(): string | null {
  const store = window.localStorage;
  const lastAuthUser = store.getItem(
    `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.LastAuthUser`
  );

  if (lastAuthUser) {
    return store.getItem(
      `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.${lastAuthUser}.accessToken`
    );
  }

  return null;
}

export function getLoggedInStatusFromStore(): boolean {
  const lastAuthUser = window.localStorage.getItem(
    `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.LastAuthUser`
  );

  if (lastAuthUser) {
    return true;
  }

  return false;
}

export function generateCurrentAuthState(): AuthState {
  const authState: AuthState = {
    isLoggedIn: getLoggedInStatusFromStore(),
    awsCognitoUser: getAwsCognitoUserFromToken()
  };

  return authState;
}

export function saveAuthStateToStore(): void {
  const store = window.localStorage;
  const lastAuthUser = store.getItem(
    `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.LastAuthUser`
  );

  if (lastAuthUser) {
    const authState: AuthState = generateCurrentAuthState();

    store.setItem(TekCapsuleLastAuthStateKey, JSON.stringify(authState));
  }
}

export function getAuthStateFromStore(): AuthState | null {
  const authState = window.localStorage.getItem(TekCapsuleLastAuthStateKey);

  if (authState) {
    return JSON.parse(authState);
  }

  return null;
}

export function deleteAuthStateFromStore(): void {
  window.localStorage.removeItem(TekCapsuleLastAuthStateKey);
}
