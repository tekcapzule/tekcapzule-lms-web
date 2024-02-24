import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  signIn,
  signInWithRedirect,
  decodeJWT,
  AuthError
} from 'aws-amplify/auth';
import { Hub, HubCapsule } from 'aws-amplify/utils';
import {
  AuthHubEventData,
  StopListenerCallback
} from '@aws-amplify/core/dist/esm/Hub/types';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hubListenerCancelToken: StopListenerCallback;
  isSubmitted = false;
  loginErrorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

  get loginFormControls() {
    return this.loginForm.controls;
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
    signInWithRedirect({ provider: 'Google' }).catch(err => {
      console.error(err);
    });
  }

  continueWithFacebook() {
    signInWithRedirect({ provider: 'Facebook' }).catch(err => {
      console.error(err);
    });
  }

  onLoginFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    this.loginErrorMessage = '';

    if (this.loginForm && this.loginForm.valid) {
      signIn({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).catch(err => {
        if (err instanceof AuthError) {
          this.loginErrorMessage = err.message;
        } else {
          console.error(err);
        }
      });
    }
  }
}
