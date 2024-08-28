import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CourseApiService, DashboradApiService } from '@app/core';
import { QuizComponent } from '@app/quiz/quiz.component';
import { VideoPlayerComponent } from '@app/shared/components/video-player/video-player.component';
import { IChapter, IChapterType, ICourseDetail, IModule } from '@app/shared/models/course-item.model';
import { IChapterStatus, ICourseStatus, IEnrollment, IModuleStatus, IStatus, PAGE_TYPE } from '@app/shared/models/user-item.model';
import { VideoListComponent } from './video-list/video-list.component';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  course: ICourseDetail;
  options = {
    fluid: true,
    loop: false,
    autoplay: false,
    muted: false,
    controls: true
  }
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  @ViewChild('quizPlayer') quizPlayer: QuizComponent;
  @ViewChild('videoList') videoList: VideoListComponent;
  playerReady: boolean;
  currentVideo: IChapter | any;
  isVideoPlaying: boolean;
  enrollCourseStatus: ICourseStatus;
  currentPage: PAGE_TYPE;
  module: IModule;
  moduleIndex = 0;
  chapterIndex = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private dashboardApi: DashboradApiService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.getUserDetails(params['code']);
    });
  }

  getUserDetails(courseId: string) {
    this.dashboardApi.getUserDetails().subscribe(data => {
      const enrollment = data.enrollments.find(e => e.courseId === courseId) as IEnrollment;
      this.getCourse(enrollment);
    });
  }

  getCourse(enrollment: IEnrollment) {
    if(this.courseApi.currentCourse && this.courseApi.currentCourse.courseId === enrollment.courseId) {
      this.course = this.courseApi.currentCourse;
      this.playCourse(enrollment);
      this.spinner.hide();
    } else {
      this.courseApi.getCourse([enrollment.courseId]).subscribe(data => {
        this.course = data[0]; 
        this.playCourse(enrollment);
        this.spinner.hide();
      });
    }
  }

  playCourse(enrollment: IEnrollment) {
    this.enrollCourseStatus = enrollment.course;
    if(!enrollment.course.modules || enrollment.course.modules?.length !== this.course.modules.length) {
      this.updateEnrollmentStatus();
    }
    this.updateCourseDuration(); 
    this.getPlayVideo();
    //console.log('curren ', this.currentPage);
  }

  updateCourseDuration() {
    this.course.watchedDuration = 0;
    this.course.status = this.enrollCourseStatus.status;
    this.enrollCourseStatus.modules.forEach((module, i) => {
      module.watchedDuration = 0;
      const enrollmentModule = this.enrollCourseStatus.modules[i]
      module.chapters.forEach((chapter, j) => {
        const enrollmentChapter = enrollmentModule.chapters[j];
        chapter.watchedDuration = enrollmentChapter.watchedDuration;
        module.watchedDuration = module.watchedDuration + chapter.watchedDuration; 
      });
      this.enrollCourseStatus.watchedDuration = this.enrollCourseStatus.watchedDuration + module.watchedDuration; 
    });
  }

  updateStatus(module: IModule, chapter: IChapterStatus | null = null) {
    this.enrollCourseStatus.lastVisitedModule = module.serialNumber;
    if(chapter) {
      this.enrollCourseStatus.lastVisitedChapter = chapter.serialNumber;
    }
    if(this.enrollCourseStatus.modules[this.moduleIndex].status !== IStatus.COMPLETED) {
      this.enrollCourseStatus.modules[this.moduleIndex].status = IStatus.IN_PROGRESS;
    }
    if(this.enrollCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status !== IStatus.COMPLETED) {
      this.enrollCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status = IStatus.IN_PROGRESS;
    } else if(this.enrollCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status === IStatus.COMPLETED) {
      this.enrollCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].watchedDuration = 0;
    }
  }

  setDefaultValues() {
    this.moduleIndex = 0;
    this.chapterIndex = 0;
    this.enrollCourseStatus.lastVisitedModule = this.course.modules[0].serialNumber; 
    this.enrollCourseStatus.lastVisitedChapter = this.course.modules[0].chapters[0].serialNumber;
    this.enrollCourseStatus.status = IStatus.IN_PROGRESS;
  }

  getPlayVideo() {
    this.currentPage = PAGE_TYPE.EMPTY;
    this.currentVideo = null;
    this.course.duration = 0;
    if(this.enrollCourseStatus.status === IStatus.COMPLETED && this.enrollCourseStatus.assessmentStatus === IStatus.COMPLETED) {
      this.currentVideo = this.course.modules[0].chapters[0];
      this.currentPage = PAGE_TYPE.VIDEO;
      return;
    }
    if(this.enrollCourseStatus.lastVisitedModule === 0 || this.enrollCourseStatus.lastVisitedChapter === 0) {
      this.currentVideo = this.course.modules[0].chapters[0];
      this.setDefaultValues();
      this.updateStatus(this.course.modules[0], this.currentVideo);
      this.currentPage = PAGE_TYPE.VIDEO;
      return;
    }
    let lastModuleIndex = this.getIndex(this.course.modules, this.enrollCourseStatus.lastVisitedModule);
    let lastChapterIndex = this.getIndex(this.course.modules[lastModuleIndex].chapters, this.enrollCourseStatus.lastVisitedChapter);
    this.module = this.course.modules[lastModuleIndex]; 
    let chapter = this.module.chapters[lastChapterIndex]; 
    const erollModule = this.enrollCourseStatus.modules[lastModuleIndex];
    let ernollChapter = erollModule.chapters[lastChapterIndex];
    this.moduleIndex = lastModuleIndex;
    this.chapterIndex = lastChapterIndex;
    if (ernollChapter.status !== IStatus.COMPLETED) {  
      this.currentVideo = chapter;
      //console.log('not complete ---- ', lastModuleIndex, this.currentVideo);
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = PAGE_TYPE.VIDEO;
    } else if((lastChapterIndex + 1) < this.module.chapters.length) {
      this.chapterIndex = lastChapterIndex + 1;
      this.currentVideo = this.module.chapters[this.chapterIndex];
      //console.log('same module ---- ', this.chapterIndex);
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = PAGE_TYPE.VIDEO;
    } else if((lastChapterIndex === this.module.chapters.length - 1) && erollModule?.quizStatus !== IStatus.COMPLETED) {
      this.currentVideo = this.module.chapters[lastChapterIndex];
      this.chapterIndex = lastChapterIndex;
      this.currentPage = PAGE_TYPE.QUIZ;
      this.cdr.detectChanges();
      this.quizPlayer.loadQuizData();
    } else if((lastModuleIndex + 1) < this.course.modules.length) {
      this.moduleIndex = lastModuleIndex + 1;
      //console.log('next module ---- ', this.moduleIndex);
      this.module = this.course.modules[this.moduleIndex];
      this.chapterIndex = 0;
      this.currentVideo = this.module.chapters[0];
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = PAGE_TYPE.VIDEO;
    } else if(this.enrollCourseStatus.assessmentStatus !== IStatus.COMPLETED) {
      //console.log('CAme Assessment');
      this.currentPage = PAGE_TYPE.ASSESSMENT;
      this.openAssessment();
    } else {
      this.enrollCourseStatus.status = IStatus.COMPLETED;
      console.log('course completed');
    }
  }

  openAssessment() {

  }

  getIndex(items: IModule[] | IChapter[], serialNumber: number): number {
    const index = items.findIndex(item => item.serialNumber === serialNumber);
    return index === -1 ? 0 : index;
  }

  getEnrollModule(serialNumber: number): IModuleStatus | undefined {
    return this.enrollCourseStatus?.modules?.find(module => module.serialNumber === serialNumber);
  }

  updateEnrollmentStatus() {
    this.enrollCourseStatus.modules = [];
    this.course.modules.forEach(module => {
      let chapteStatus: IChapterStatus[] = []
      module.chapters.forEach(chapter => {
        chapteStatus.push({
          serialNumber: chapter.serialNumber,
          watchedDuration: 0,
          status: IStatus.IN_PROGRESS,
        });
      });
      const moduleStatus = {
        serialNumber: module.serialNumber,
          watchedDuration: 0,
          status: IStatus.IN_PROGRESS,
          quizScore: 0,
          quizStatus: IStatus.IN_PROGRESS,
          chapters: chapteStatus
      }
      this.enrollCourseStatus.modules.push(moduleStatus);
      this.enrollCourseStatus.status = IStatus.IN_PROGRESS;
    });
  }

  onPlayerReady() {
    this.playerReady = true;
    if (!this.isVideoPlaying && this.currentVideo && this.currentPage === 'Video') {
      this.isVideoPlaying = true;
      this.onVideoChange(this.currentVideo);
    }
  }

  onVideoEnded() {
    this.videoList.updateProgress();
    this.currentVideo = null;
    this.getPlayVideo();
    if(this.currentPage === 'Video' && this.currentVideo.chapterType === IChapterType.VIDEO_CONTENT && this.currentVideo) {
      this.onVideoChange(this.currentVideo);
    }
  }

  onVideoChange(chapter: IChapter) {
    this.videoPlayer.changeVideo(this.course, chapter);
  }

  onPlayQuiz(module: IModule) {
    this.videoPlayer.pauseVideo();
    this.module = module;
    this.updateStatus(module);
    this.currentPage = PAGE_TYPE.QUIZ;
    this.cdr.detectChanges();
    this.quizPlayer.loadQuizData();
  }

  onPlayAssessment() {
    this.videoPlayer.pauseVideo();
    this.currentPage = PAGE_TYPE.ASSESSMENT;
  }

  onVideoSelect(data: any) {
    this.moduleIndex = data.moduleIndex;
    this.chapterIndex = data.chapterIndex;
    this.updateStatus(data.module, data.chapter);
    if (data.chapter.chapterType === IChapterType.VIDEO_CONTENT) {
      this.currentPage = PAGE_TYPE.VIDEO;
      this.onVideoChange(data.chapter);
    } else {
      this.videoPlayer.pauseVideo();
      this.currentPage = PAGE_TYPE.PDF;
      this.currentVideo = data.chapter;
    }
  }

  onQuizCompleted() {
    const module = this.getEnrollModule(this.module.serialNumber);
    if(module) {
      module.quizStatus = IStatus.COMPLETED;
    }
    this.onVideoEnded();
  }

  onAssessmentComplete() {
    this.videoList.updateProgress();
  }
}
