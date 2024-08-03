import { Component, OnDestroy, OnInit, Renderer2  } from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2 
  ) {
    super(authStateService);
  }

  ngOnDestroy(): void {
    this.onInit();
  }

  ngOnInit(): void {
    this.onDestroy();
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.renderer.setAttribute(document.body, 'data-theme', 'dark');
    }
  
  }
  toggleTheme(event: any) {
    if (event.target.checked) {
      this.renderer.setAttribute(document.body, 'data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeAttribute(document.body, 'data-theme');
      localStorage.removeItem('theme');
    }
  }

  signOutUser() {
    signOut().then(() => {
      deleteAuthStateFromStore();
      this.authStateService.resetAuthState();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
