import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  signIn,
  signInWithRedirect,
  AuthError,
  SignInInput,
  SignInWithRedirectInput
} from 'aws-amplify/auth';
import { AuthProvider } from '@aws-amplify/auth/dist/esm/types/inputs';

import { AbstractBaseAuth } from '@app/auth/base-auth';
import { AuthStateService } from '@app/core/services';
import { OAuth2Provider } from '@app/shared/models';

interface LoginFormType {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

type LoginFormValueType = Partial<{
  email: string | null;
  password: string | null;
}>;

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  loginForm: FormGroup<LoginFormType>;
  isSubmitted = false;
  loginErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);

    this.loginForm = this.fb.group<LoginFormType>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
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

  continueWithGoogle() {
    this.handleSignInWithRedirect(OAuth2Provider.Google);
  }

  continueWithFacebook() {
    this.handleSignInWithRedirect(OAuth2Provider.Facebook);
  }

  override signedInCallback(): void {
    this.router.navigateByUrl('/lms/dashboard');
  }

  onLoginFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    this.loginErrorMessage = '';

    if (this.loginForm.valid) {
      const formValue: LoginFormValueType = this.loginForm.value;

      this.handleSignIn({
        username: formValue.email!,
        password: formValue.password!
      });
    }
  }

  async handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.warn('Login:signIn => ', isSignedIn, nextStep.signInStep);
    } catch (error) {
      if (error instanceof AuthError) {
        this.loginErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }

  async handleSignInWithRedirect(provider: AuthProvider) {
    try {
      await signInWithRedirect({ provider });
    } catch (error) {
      if (error instanceof AuthError) {
        this.loginErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }
}
