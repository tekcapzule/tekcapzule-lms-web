import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CourseApiService, DashboradApiService } from '@app/core';
import { QuizComponent } from '@app/quiz/quiz.component';
import { VideoPlayerComponent } from '@app/shared/components/video-player/video-player.component';
import { IChapter, ICourseDetail, IModule } from '@app/shared/models/course-item.model';
import { IChapterStatus, ICourseStatus, IEnrollment, IModuleStatus, IStatus } from '@app/shared/models/user-item.model';

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
  playerReady: boolean;
  currentVideo: IChapter | any;
  isVideoPlaying: boolean;
  enrollmentCourseStatus: ICourseStatus;
  currentPage: ''| 'Video' | 'Quiz' | 'Assessment';
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
    this.enrollmentCourseStatus = enrollment.course;
    if(!enrollment.course.modules || enrollment.course.modules?.length ! == this.course.modules.length) {
      this.updateEnrollmentStatus();
    }
    this.updateCourseDuration(); 
    this.getPlayVideo();
    console.log('curren ', this.currentPage);
  }

  updateCourseDuration() {
    this.course.watchedDuration = 0;
    this.course.status = this.enrollmentCourseStatus.status;
    this.enrollmentCourseStatus.modules.forEach((module, i) => {
      module.watchedDuration = 0;
      const enrollmentModule = this.enrollmentCourseStatus.modules[i]
      module.chapters.forEach((chapter, j) => {
        const enrollmentChapter = enrollmentModule.chapters[j];
        chapter.watchedDuration = 0;
        chapter.watchedDuration = enrollmentChapter.watchedDuration;
        chapter['status'] = enrollmentChapter.status;
        module.watchedDuration = module.watchedDuration + chapter.watchedDuration; 
      });
      this.course.watchedDuration = this.course.watchedDuration + module.watchedDuration; 
      if(module.watchedDuration) {
        module.watchedDuration = module.watchedDuration;
      }
    });
  }

  updateStatus(module: IModule, chapter: IChapterStatus | null = null) {
    this.enrollmentCourseStatus.lastVisitedModule = module.serialNumber;
    if(chapter) {
      this.enrollmentCourseStatus.lastVisitedChapter = chapter.serialNumber;
    }
    if(this.enrollmentCourseStatus.modules[this.moduleIndex].status !== 'Completed') {
      this.enrollmentCourseStatus.modules[this.moduleIndex].status = IStatus.IN_PROGRESS;
    }
    if(this.enrollmentCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status !== 'Completed') {
      this.enrollmentCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status = IStatus.IN_PROGRESS;
    } else {
      this.enrollmentCourseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].watchedDuration = 0;
    }
  }

  setDefaultValues() {
    this.moduleIndex = 0;
    this.chapterIndex = 0;
    this.enrollmentCourseStatus.lastVisitedModule = this.course.modules[0].serialNumber; 
    this.enrollmentCourseStatus.lastVisitedChapter = this.course.modules[0].chapters[0].serialNumber;
    this.enrollmentCourseStatus.status = IStatus.IN_PROGRESS;
  }

  getPlayVideo() {
    this.currentPage = '';
    this.currentVideo = null;
    this.course.duration = 0;
    if(this.enrollmentCourseStatus.lastVisitedModule === 0 || this.enrollmentCourseStatus.lastVisitedChapter === 0) {
      this.currentVideo = this.course.modules[0].chapters[0];
      this.setDefaultValues();
      this.updateStatus(this.course.modules[0], this.currentVideo);
      this.currentPage = 'Video';
      return;
    }
    let lastModuleIndex = this.getIndex(this.course.modules, this.enrollmentCourseStatus.lastVisitedModule);
    let lastChapterIndex = this.getIndex(this.course.modules[lastModuleIndex].chapters, this.enrollmentCourseStatus.lastVisitedChapter);
    this.module = this.course.modules[lastModuleIndex]; 
    let chapter = this.module.chapters[lastChapterIndex]; 
    const erollModule = this.getEnrollModule(this.enrollmentCourseStatus.lastVisitedModule);
    this.moduleIndex = lastModuleIndex;
    this.chapterIndex = lastChapterIndex;
    if (chapter.status !== IStatus.COMPLETED) {  
      this.currentVideo = chapter;
      console.log('not complete ---- ', lastModuleIndex, this.currentVideo);
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = 'Video';
    } else if((lastChapterIndex + 1) < this.module.chapters.length) {
      this.currentVideo = this.module.chapters[lastChapterIndex + 1];
      this.chapterIndex = lastChapterIndex + 1;
      console.log('same module ---- ', lastModuleIndex, this.currentVideo);
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = 'Video';
    } else if((lastChapterIndex === this.module.chapters.length - 1) && erollModule?.quizStatus !== 'Completed') {
      this.currentVideo = this.module.chapters[lastChapterIndex];
      this.chapterIndex = lastChapterIndex;
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = 'Quiz';
      this.cdr.detectChanges();
      this.quizPlayer.loadQuizData();
    } else if((lastModuleIndex + 1) < this.course.modules.length) {
      console.log('next module ---- ', lastModuleIndex + 1, this.currentVideo);
      this.module = this.course.modules[lastModuleIndex + 1];
      this.moduleIndex = lastModuleIndex + 1;
      this.chapterIndex = 0;
      this.currentVideo = this.module.chapters[0];
      this.updateStatus(this.module, this.currentVideo);
      this.currentPage = 'Video';
    } else if(this.enrollmentCourseStatus.assessmentStatus !== 'Completed') {
      console.log('CAme Assessment');
      this.currentPage = 'Assessment';
      this.openAssessment();
    } else {
      this.enrollmentCourseStatus.status = IStatus.COMPLETED;
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
    return this.enrollmentCourseStatus?.modules?.find(module => module.serialNumber === serialNumber);
  }

  updateEnrollmentStatus() {
    this.enrollmentCourseStatus.modules = [];
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
      this.enrollmentCourseStatus.modules.push(moduleStatus);
    });
  }

  /*createCourseStatus(module: IModule, chapter: IChapterStatus | null = null) {
    const erollModule = this.getEnrollModule(module.serialNumber);
    this.courseStatus = {
      courseId: this.course.courseId,
      watchedDuration: 0,
      status: this.enrollmentCourseStatus.status || IStatus.IN_PROGRESS,
      lastVisitedModule: module.serialNumber,
      lastVisitedChapter: this.enrollmentCourseStatus.lastVisitedChapter,
      assessmentScore: this.enrollmentCourseStatus.assessmentScore || 0,
      assessmentStatus: this.enrollmentCourseStatus.assessmentStatus,
      modules: [
        {
          serialNumber: module.serialNumber,
          watchedDuration: 0,
          status: IStatus.IN_PROGRESS,
          quizScore: erollModule?.quizScore || 0,
          quizStatus: erollModule?.quizStatus || IStatus.IN_PROGRESS,
          chapters:[]
        }]     
    }

    if(chapter) {
      this.courseStatus.modules[0].chapters = [{
        serialNumber: chapter.serialNumber,
        watchedDuration: 0,
        status: IStatus.IN_PROGRESS,
      }];
    }
  }*/

  onPlayerReady() {
    this.playerReady = true;
    if (!this.isVideoPlaying && this.currentVideo) {
      this.isVideoPlaying = true;
      this.onVideoChange(this.currentVideo);
    }
  }

  onVideoEnded() {
    this.currentVideo = null;
    this.getPlayVideo();
    if(this.currentPage === 'Video' && this.currentVideo) {
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
    this.currentPage = 'Quiz';
    this.cdr.detectChanges();
    this.quizPlayer.loadQuizData();
  }

  onPlayAssessment() {
    this.videoPlayer.pauseVideo();
    this.currentPage = 'Assessment';
  }

  onVideoSelect(data: any) {
    data.chapter.watchedDuration = 0;
    this.updateStatus(data.module, data.chapter);
    this.currentPage = 'Video';
    this.onVideoChange(data.chapter);
  }

  onQuizCompleted() {
    const module = this.getEnrollModule(this.module.serialNumber);
    if(module) {
      module.quizStatus = IStatus.COMPLETED;
    }
    this.onVideoEnded();
  }
}
