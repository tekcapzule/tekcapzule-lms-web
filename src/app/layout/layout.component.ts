import { Component, OnDestroy, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractBaseAuth } from '@app/auth/base-auth';
import { signOut } from 'aws-amplify/auth';

import { AuthStateService } from '@app/core/services';
import { deleteAuthStateFromStore } from '@app/shared/utils';
import { Checkbox } from 'primeng/checkbox';
import { CourseApiService } from '@app/core';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent
  extends AbstractBaseAuth
  implements OnInit, OnDestroy
{
  activeMenu: string = '';
  constructor(
    public override authStateService: AuthStateService,
    private router: Router,
    private renderer: Renderer2,
    private courseService: CourseApiService
  ) {
    super(authStateService);
  }
  menus = [
    { name: 'hamburger', label: '', link: '#', icon: 'hamburger-icon' },
    { name: 'home', label: 'Home', link: '/lms/dashboard', icon: 'home-icon' },
    { name: 'courses', label: 'Courses', link: '/lms/courses', icon: 'course-icon' },
    { name: 'references', label: 'References', link: '/lms/references', icon: 'references-icon' },
    { name: 'calendar', label: 'Calendar', link: '/lms/calendar', icon: 'calendar-icon' },
    { name: 'inbox', label: 'Inbox', link: '/lms/inbox', icon: 'inbox-icon' },
    { name: 'reports', label: 'Reports', link: '/lms/reports', icon: 'reports-icon' },
    { name: 'settings', label: 'Settings', link: '/lms/settings', icon: 'settings-icon' }
  ];
  getUserInitials(): string {
    const firstName = this.authStateService.getFirstName();
    const lastName = this.authStateService.getLastName();
    
    // If both first name and last name are available, return the initials
    if (firstName && lastName) {
      return firstName.charAt(0) + lastName.charAt(0);
    }
    
    // Fallback to just first name initial if no last name is present
    return firstName ? firstName.charAt(0) : '';
  }
  setActive(menuName: string) {
    this.activeMenu = menuName;
  }

  isActive(menuName: string): boolean {
    return this.activeMenu === menuName;
  }
  ngOnDestroy(): void {
    this.onInit();
  }

  ngOnInit(): void {
    this.onDestroy();
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.renderer.setAttribute(document.body, 'data-theme', 'dark');
      (document.body.querySelector('input[data-name="theme-toggle-switch"]') as HTMLInputElement).checked = true;
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
      this.courseService.currentCourse = null;
      deleteAuthStateFromStore();
      this.authStateService.resetAuthState();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
