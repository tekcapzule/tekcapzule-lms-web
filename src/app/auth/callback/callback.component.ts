import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractBaseAuth } from '@app/auth/base-auth';
import { AuthStateService } from '@app/core/services';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  constructor(
    private router: Router,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  override signedInCallback(): void {
    this.router.navigateByUrl('/lms/dashboard');
  }
}
