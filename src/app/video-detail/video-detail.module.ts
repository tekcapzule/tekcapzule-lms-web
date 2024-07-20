import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoDetailComponent } from './video-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { VideoDetailRoutingModule } from './video-detail-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ResourceComponent } from './resource/resource.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { VideoListComponent } from './video-list/video-list.component';
import { SecondsToMinutesPipe } from '@app/core/pipe/seconds-to-minutes.pipe';

@NgModule({
  declarations: [
    VideoDetailComponent,
    OverviewComponent,
    ResourceComponent,
    DiscussionComponent,
    AnnouncementComponent,
    VideoListComponent,
    SecondsToMinutesPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoDetailRoutingModule
  ],
})
export class VideoDetailModule {}
