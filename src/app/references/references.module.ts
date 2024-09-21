import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesComponent } from './references.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core';

@NgModule({
  declarations: [ReferencesComponent],
  imports: [CommonModule, ReferencesRoutingModule, SharedModule, CoreModule]
  
})
export class ReferencesModule {}
