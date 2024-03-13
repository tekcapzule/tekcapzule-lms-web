import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthError,
  confirmResetPassword,
  ConfirmResetPasswordInput,
  signIn,
  SignInInput
} from 'aws-amplify/auth';

import { AuthStateService } from '@app/core/services';
import { AuthValidators } from '@app/shared/utils';
import { allowOnlyNumericInput } from '@app/shared/utils';
import { AbstractBaseAuth } from '../base-auth';

interface ConfirmResetPasswordFormType {
  confirmationCode: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  isSubmitted = false;
  username: string | undefined = '';
  deliveryEmail: string | undefined = '';
  allowOnlyNumericInput = allowOnlyNumericInput;
  resetPasswordForm: FormGroup<ConfirmResetPasswordFormType>;
  confirmResetPasswordErrorMessage = '';

  constructor(
    public override authStateService: AuthStateService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super(authStateService);

    this.resetPasswordForm = this.fb.group<ConfirmResetPasswordFormType>(
      {
        confirmationCode: this.fb.control('', [Validators.required]),
        newPassword: this.fb.control('', [
          Validators.required,
          AuthValidators.checkPasswordPolicy
        ]),
        confirmPassword: this.fb.control('', [Validators.required])
      },
      {
        validators: [AuthValidators.match('newPassword', 'confirmPassword')]
      }
    );

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

  get resetPasswordFormControls() {
    return this.resetPasswordForm.controls;
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;

    if (this.username && this.resetPasswordForm.valid) {
      const formValue = this.resetPasswordForm.value;

      this.handleConfirmResetPassword({
        username: this.username!,
        confirmationCode: formValue.confirmationCode!,
        newPassword: formValue.newPassword!
      });
    }
  }

  async handleConfirmResetPassword({
    username,
    newPassword,
    confirmationCode
  }: ConfirmResetPasswordInput) {
    try {
      await confirmResetPassword({
        username,
        newPassword,
        confirmationCode
      });

      this.handleSignIn({ username, password: newPassword });
    } catch (error) {
      if (error instanceof AuthError) {
        this.confirmResetPasswordErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }

  async handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.warn(
        'ConfirmResetPassword:signIn => ',
        isSignedIn,
        nextStep.signInStep
      );

      if (isSignedIn && nextStep.signInStep === 'DONE') {
        this.saveCurrentAuthStateToStore();
        this.router.navigateByUrl('/lms/dashboard');
      }
    } catch (error) {
      if (error instanceof AuthError) {
        this.confirmResetPasswordErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }
}
