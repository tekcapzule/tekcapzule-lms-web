import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { TaskCardComponent } from './task-card/task-card.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [DashboardComponent, TaskCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ToastModule
  ]
})
export class DashboardModule {}
