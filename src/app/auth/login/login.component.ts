import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn, signInWithRedirect, SignInOutput } from 'aws-amplify/auth';
import { Hub, HubCapsule } from 'aws-amplify/utils';
import { AuthHubEventData } from '@aws-amplify/core/dist/esm/Hub/types';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hubListenerCancelToken: any = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

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
        this.handleAwsCognitoAfterSignedIn();
        break;
    }
  }

  private handleAwsCognitoAfterSignedIn() {
    this.router.navigateByUrl('/lms/dashboard');
  }

  continueWithGoogle() {
    signInWithRedirect({ provider: 'Google' });
  }

  continueWithFacebook() {
    signInWithRedirect({ provider: 'Facebook' });
  }

  onLoginFormSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm && this.loginForm.valid) {
      signIn({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });
    }
  }
}
