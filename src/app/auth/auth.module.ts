import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CallbackComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmSignupComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
