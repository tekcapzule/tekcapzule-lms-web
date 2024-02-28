import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoDetailComponent } from './video-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { VideoDetailRoutingModule } from './video-detail-routing.module';

@NgModule({
  declarations: [VideoDetailComponent],
  imports: [CommonModule, SharedModule, VideoDetailRoutingModule],
})
export class VideoDetailModule {}
