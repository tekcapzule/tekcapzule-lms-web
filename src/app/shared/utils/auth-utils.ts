import { AuthState, AuthStateService } from '@app/core/services';
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

export function saveAuthStateToStore(authState: AuthState): void {
  const store = window.localStorage;
  const lastAuthUser = store.getItem(
    `CognitoIdentityServiceProvider.${awsExports.aws_user_pools_web_client_id}.LastAuthUser`
  );

  if (lastAuthUser) {
    store.setItem(
      `TekCapzule.${awsExports.aws_user_pools_web_client_id}.AuthState`,
      JSON.stringify(authState)
    );
  }
}

export function deleteAuthStateFromStore(): void {
  window.localStorage.removeItem(
    `TekCapzule.${awsExports.aws_user_pools_web_client_id}.AuthState`
  );
}

export function checkAuthStatusOnPageRefresh(authStateSvc: AuthStateService) {
  const authState = window.localStorage.getItem(
    `TekCapzule.${awsExports.aws_user_pools_web_client_id}.AuthState`
  );

  if (authState) {
    authStateSvc.setAuthState(JSON.parse(authState));
  }
}
