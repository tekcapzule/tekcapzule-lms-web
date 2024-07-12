import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../app-state/auth-state.service';


/**
 * Prevent access to routes if access-token is not present.
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard {
  constructor( private authState: AuthStateService ) { }

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('isUserLoggedIn ----  Authguard ', this.authState.isUserLoggedIn());
     if(this.authState.isUserLoggedIn()) {
      return true;
     } else {
      this.authState.signInUser();
      return false;
     }


  }
}