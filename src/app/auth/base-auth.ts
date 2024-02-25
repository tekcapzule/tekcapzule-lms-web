import { Hub, HubCapsule } from 'aws-amplify/utils';
import {
  AuthHubEventData,
  StopListenerCallback
} from '@aws-amplify/core/dist/esm/Hub/types';

export abstract class BaseAuth {
  hubListenerCancelToken: StopListenerCallback;

  constructor() {}

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
        this.signedInCallback();
        break;
      case 'signInWithRedirect':
        this.signInWithRedirectCallback();
        break;
      case 'signedOut':
        this.signedOutCallback();
        break;
    }
  }

  signedInCallback(): void {}

  signInWithRedirectCallback(): void {}

  signedOutCallback(): void {}
}
