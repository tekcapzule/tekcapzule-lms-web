import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'lms',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'course-detail/:code',
        loadChildren: () =>
          import('./course-detail/course-detail.module').then(m => m.CourseDetailModule)
      },
      {
        path: 'video-detail/:code',
        loadChildren: () =>
          import('./video-detail/video-detail.module').then(m => m.VideoDetailModule)
      },
      {
        path: 'feeds',
        loadChildren: () =>
          import('./feeds/feeds.module').then(m => m.FeedsModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'references',
        loadChildren: () =>
          import('./references/references.module').then(m => m.ReferencesModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
