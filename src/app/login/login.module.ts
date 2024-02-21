import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, CallbackComponent, SignupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginRoutingModule]
})
export class LoginModule {}
