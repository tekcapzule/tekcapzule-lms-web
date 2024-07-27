import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthError, signUp } from 'aws-amplify/auth';

import { AbstractBaseAuth } from '@app/auth/base-auth';
import { AuthStateService } from '@app/core/services';
import { allowNonSpaceCharacterInput, AuthValidators } from '@app/shared/utils';

interface SignUpFormType {
  email: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  password: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
}

type SignUpFormValueType = Partial<{
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  phoneNumber: string | null;
}>;

type SignUpParameters = {
  username: string;
  password: string;
  given_name: string;
  family_name: string;
  phone_number: string;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  signupForm: FormGroup<SignUpFormType>;
  isSubmitted = false;
  signupErrorMessage = '';
  allowNonSpaceCharacterInput = allowNonSpaceCharacterInput;
  isPasswordMasked = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);

    this.signupForm = this.fb.group<SignUpFormType>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        AuthValidators.checkPasswordPolicy
      ]),
      phoneNumber: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  get signupFormControls(): SignUpFormType {
    return this.signupForm.controls;
  }

  onSignupFormSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;

    if (this.signupForm.valid) {
      const formValue: SignUpFormValueType = this.signupForm.value;

      this.handleSignUp({
        username: formValue.email!,
        password: formValue.password!,
        given_name: formValue.firstName!,
        family_name: formValue.lastName!,
        phone_number: formValue.phoneNumber!
      });
    }
  }

  async handleSignUp({
    username,
    password,
    given_name,
    family_name,
    phone_number
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            given_name,
            family_name,
            phone_number
          },
          autoSignIn: true
        }
      });

      if (!isSignUpComplete && nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        this.router.navigateByUrl('/auth/confirm-signup', {
          state: {
            username,
            destination: nextStep.codeDeliveryDetails.destination
          }
        });
      }
    } catch (error) {
      if (error instanceof AuthError) {
        this.signupErrorMessage = error.message;
      } else {
        console.error(error);
      }
    }
  }
}
