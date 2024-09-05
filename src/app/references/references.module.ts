import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesComponent } from './references.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ReferencesComponent],
  imports: [CommonModule, ReferencesRoutingModule, SharedModule],
})
export class ReferencesModule {}
