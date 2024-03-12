import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthError, resetPassword, ResetPasswordInput } from 'aws-amplify/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  isSubmitted = false;
  forgotPasswordErrorMessage = '';
  emailFormControl: FormControl<string | null>;

  constructor(private router: Router) {
    this.emailFormControl = new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;

    if (this.emailFormControl.valid) {
      this.handleResetPassword({ username: this.emailFormControl.value! });
    }
  }

  async handleResetPassword({ username }: ResetPasswordInput) {
    try {
      const { isPasswordReset, nextStep } = await resetPassword({ username });

      if (
        !isPasswordReset &&
        nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'
      ) {
        this.router.navigateByUrl('/auth/confirm-reset-password', {
          state: {
            username,
            destination: nextStep.codeDeliveryDetails.destination
          }
        });
      }
    } catch (error) {
      if (error instanceof AuthError) {
        this.forgotPasswordErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }
}
