import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AwsCognitoUser } from '@app/shared/models';
import { BaseStateService } from './base-state.service';
import { Router } from '@angular/router';

export type AuthState = {
  isLoggedIn: boolean;
  awsCognitoUser: AwsCognitoUser | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  awsCognitoUser: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthStateService extends BaseStateService<AuthState> {
  isLoggedIn$: Observable<boolean> = this.select(state => state.isLoggedIn);

  constructor( private router: Router) {
    super(initialState);
  }

  public isUserLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  public signInUser() {
    this.router.navigateByUrl('/lms/login');
  }

  public getAwsCognitoUser(): AwsCognitoUser | null {
    return this.state.awsCognitoUser;
  }

  public getEmail(): string | undefined {
    return "06.prerna@gmail.com";
    return this.state.awsCognitoUser?.email || "06.prerna@gmail.com";
  }

  public getFirstName(): string | undefined {
    return this.state.awsCognitoUser?.given_name;
  }

  public getFullName(): string {
    if(this.state.awsCognitoUser) {
      return this.state.awsCognitoUser.given_name + ' ' + this.state.awsCognitoUser.family_name;
    }
    return 'Linjith Kunnon';
  }

  public setAuthState(newState: Partial<AuthState>) {
    this.setState(newState);
  }

  public resetAuthState() {
    this.setState(initialState);
  }
}
