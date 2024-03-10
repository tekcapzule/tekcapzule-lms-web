import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email = '';

  getEmailIfPresent(): string {
    return this.email ? ` to ${this.email}` : '';
  }
}