import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn, signInWithRedirect, AuthError } from 'aws-amplify/auth';

import { BaseAuth } from '@app/auth/base-auth';
import { AuthStateService } from '@app/core/services';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseAuth implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isSubmitted = false;
  loginErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  override signedInCallback(): void {
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
