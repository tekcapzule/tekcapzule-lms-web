import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthError,
  autoSignIn,
  confirmSignUp,
  ConfirmSignUpInput,
  resendSignUpCode,
  ResendSignUpCodeInput
} from 'aws-amplify/auth';

import { allowOnlyNumericInput } from '@app/shared/utils/common-utils';
import { AbstractBaseAuth } from '../base-auth';
import { AuthStateService } from '@app/core/services';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss']
})
export class ConfirmSignupComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  isSubmitted = false;
  username: string | undefined = '';
  deliveryEmail: string | undefined = '';
  allowOnlyNumericInput = allowOnlyNumericInput;
  verificationCodeFormControl: FormControl<string | null>;
  confirmSignupErrorMessage = '';

  constructor(
    private router: Router,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);

    this.verificationCodeFormControl = new FormControl<string>('', [
      Validators.required
    ]);

    this.username = this.router.getCurrentNavigation()?.extras.state
      ?.username as string;

    this.deliveryEmail = this.router.getCurrentNavigation()?.extras.state
      ?.destination as string;
  }

  ngOnDestroy(): void {
    this.onInit();
  }

  ngOnInit(): void {
    this.onDestroy();
  }

  getDeliveryEmailIfPresent(): string {
    return this.deliveryEmail ? ` to ${this.deliveryEmail}` : '';
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;

    if (this.username && this.verificationCodeFormControl.valid) {
      this.handleConfirmSignUp({
        username: this.username,
        confirmationCode: this.verificationCodeFormControl.value!
      });
    }
  }

  onSendNewCode(event: Event): void {
    event.preventDefault();

    if (this.username) {
      this.handleResendSignUpCode({ username: this.username! });
    }
  }

  async handleConfirmSignUp({
    username,
    confirmationCode
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });

      if (isSignUpComplete && nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        await this.handleAutoSignIn();
      }
    } catch (error) {
      if (error instanceof AuthError) {
        this.confirmSignupErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }

  async handleAutoSignIn() {
    try {
      const { isSignedIn, nextStep } = await autoSignIn();

      if (isSignedIn && nextStep.signInStep === 'DONE') {
        this.saveCurrentAuthStateToStore();
        this.router.navigateByUrl('/lms/dashboard');
      }
    } catch (error) {
      if (error instanceof AuthError) {
        this.confirmSignupErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }

  async handleResendSignUpCode({ username }: ResendSignUpCodeInput) {
    try {
      await resendSignUpCode({ username });
    } catch (error) {
      if (error instanceof AuthError) {
        this.confirmSignupErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }
}
