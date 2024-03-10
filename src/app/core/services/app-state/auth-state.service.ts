import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AwsCognitoUser } from '@app/shared/models';
import { BaseStateService } from './base-state.service';

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

  constructor() {
    super(initialState);
  }

  public isUserLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  public getAwsCognitoUser(): AwsCognitoUser | null {
    return this.state.awsCognitoUser;
  }

  public getFirstName(): string | undefined {
    return this.state.awsCognitoUser?.given_name;
  }

  public setAuthState(newState: Partial<AuthState>) {
    this.setState(newState);
  }

  public resetAuthState() {
    this.setState(initialState);
  }
}
