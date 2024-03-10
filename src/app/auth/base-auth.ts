import { Hub, HubCapsule } from 'aws-amplify/utils';
import {
  AuthHubEventData,
  StopListenerCallback
} from '@aws-amplify/core/dist/esm/Hub/types';
import { AuthState, AuthStateService } from '@app/core/services';
import {
  getAuthStateFromStore,
  generateCurrentAuthState,
  saveAuthStateToStore
} from '@app/shared/utils/auth-utils';

export abstract class AbstractBaseAuth {
  hubListenerCancelToken: StopListenerCallback;
  authStateService: AuthStateService;

  constructor(authStateService: AuthStateService) {
    this.authStateService = authStateService;
    this.checkAuthStatusOnPageRefresh();
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

  saveCurrentAuthStateToStore(): void {
    this.authStateService.setAuthState(generateCurrentAuthState());
    saveAuthStateToStore();
  }

  private checkAuthStatusOnPageRefresh() {
    const authState = getAuthStateFromStore();

    if (authState) {
      this.authStateService.setAuthState(authState);
    } else {
      this.authStateService.resetAuthState();
    }
  }

  private authEventListener(data: HubCapsule<'auth', AuthHubEventData>) {
    console.log(data.payload.event);

    switch (data.payload.event) {
      case 'signedIn':
        this.handleSignedInAuthEvent();
        break;
    }
  }

  private handleSignedInAuthEvent(): void {
    this.saveCurrentAuthStateToStore();
    this.signedInCallback();
  }

  signedInCallback(): void {}
}
