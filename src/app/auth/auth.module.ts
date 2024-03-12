import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CallbackComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ConfirmSignupComponent,
    ConfirmResetPasswordComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
