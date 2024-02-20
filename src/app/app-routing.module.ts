import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'feeds',
        loadChildren: () => import('./feeds/feeds.module').then((m) => m.FeedsModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'references',
        loadChildren: () => import('./references/references.module').then((m) => m.ReferencesModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
