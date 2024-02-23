import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CallbackComponent,
    SignupComponent,
    ForgotpasswordComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
