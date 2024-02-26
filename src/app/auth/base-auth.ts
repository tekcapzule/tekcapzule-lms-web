import { Hub, HubCapsule } from 'aws-amplify/utils';
import {
  AuthHubEventData,
  StopListenerCallback
} from '@aws-amplify/core/dist/esm/Hub/types';
import { getAwsCognitoUserFromToken } from '@app/shared/utils';
import { AuthState, AuthStateService } from '@app/core/services';
import {
  checkAuthStatusOnPageRefresh,
  getAccessTokenFromStore,
  saveAuthStateToStore
} from '@app/shared/utils/auth-utils';

export abstract class BaseAuth {
  hubListenerCancelToken: StopListenerCallback;
  authStateService: AuthStateService;

  constructor(authStateService: AuthStateService) {
    this.authStateService = authStateService;
    checkAuthStatusOnPageRefresh(authStateService);
  }

  onInit(): void {
    this.hubListenerCancelToken = Hub.listen('auth', data => {
      this.authEventListener(data);
    });
  }

  onDestroy(): void {
    if (this.hubListenerCancelToken) {
      this.hubListenerCancelToken();
    }
  }

  private authEventListener(data: HubCapsule<'auth', AuthHubEventData>) {
    switch (data.payload.event) {
      case 'signedIn':
        this.handleSignedInAuthEvent();
        break;
    }
  }

  private handleSignedInAuthEvent(): void {
    const authState: AuthState = {
      isLoggedIn: true,
      awsCognitoUser: getAwsCognitoUserFromToken(),
      accessToken: getAccessTokenFromStore()
    };
    this.authStateService.setAuthState(authState);
    saveAuthStateToStore(authState);
    this.signedInCallback();
  }

  signedInCallback(): void {}
}
