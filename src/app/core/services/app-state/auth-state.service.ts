import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AwsCognitoUser } from '@app/shared/models/aws-user.model';
import { BaseStateService } from './base-state.service';

export interface AuthState {
  isLoggedIn: boolean;
  awsCognitoUser: AwsCognitoUser | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  awsCognitoUser: null,
  accessToken: ''
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

  public getAccessToken(): string | null {
    return this.state.accessToken;
  }

  public setAuthState(newState: Partial<AuthState>) {
    this.setState(newState);
  }

  public resetAuthState() {
    this.setState(initialState);
  }
}
