import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';
import { Hub, HubCapsule } from 'aws-amplify/utils';
import { AuthHubEventData } from '@aws-amplify/core/dist/esm/Hub/types';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit, OnDestroy {
  hubListenerCancelToken: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.hubListenerCancelToken = Hub.listen('auth', data => {
      this.authEventListener(data);
    });
  }

  ngOnDestroy(): void {
    if (this.hubListenerCancelToken) {
      this.hubListenerCancelToken();
    }
  }

  private authEventListener(data: HubCapsule<'auth', AuthHubEventData>) {
    switch (data.payload.event) {
      case 'signedIn':
        this.handleOAuth2SignedInCallback();
        break;
    }
  }

  private handleOAuth2SignedInCallback() {
    this.router.navigateByUrl('/lms/dashboard');
  }
}
