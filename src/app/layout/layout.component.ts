import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractBaseAuth } from '@app/auth/base-auth';
import { signOut } from 'aws-amplify/auth';

import { AuthStateService } from '@app/core/services';
import { deleteAuthStateFromStore } from '@app/shared/utils';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  constructor(
    public override authStateService: AuthStateService,
    private router: Router
  ) {
    super(authStateService);
  }

  ngOnDestroy(): void {
    this.onInit();
  }

  ngOnInit(): void {
    this.onDestroy();
  }

  signOutUser() {
    signOut().then(() => {
      deleteAuthStateFromStore();
      this.authStateService.resetAuthState();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
