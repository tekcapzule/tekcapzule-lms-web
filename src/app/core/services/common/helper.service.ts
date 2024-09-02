import { Injectable } from '@angular/core';
import { ErrorModel, ICourseDetail } from '@app/shared/models';
import { ICourseStatus, IStatus } from '@app/shared/models/user-item.model';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private messageService: MessageService) {}

  showSuccess(msg: any): void {
    this.messageService.add({ key: 'tc', severity: 'success', detail: msg });
  }

  getInternalErrorMessage(): ErrorModel {
    return {
      key: 'tc',
      severity: 'error',
      // summary: 'Error',
      detail: 'Oops! Something went wrong!',
    };
  }
  
  getProgress(courseStatus: ICourseStatus, course: ICourseDetail) {
    let chapterCount = 0;
    let completedCount = 0;
    if(courseStatus.modules) { 
      courseStatus.modules.forEach((module, i) => {
        module.chapters.forEach(chapter => {
          chapterCount ++;
          if(chapter.status === IStatus.COMPLETED) {
            completedCount++;
          }
        });
        //QuizCount
        if(course.modules[i].quiz) {
          chapterCount ++;
          if(module.quizStatus === IStatus.COMPLETED) {
            completedCount++;
          }
        }
      });
      if(course.assessment) {
        chapterCount ++;
        if(courseStatus.assessmentStatus === IStatus.COMPLETED) {
          completedCount++;
        }
      }
    }

    return Math.floor((completedCount / chapterCount) * 100);
  }

  updateCourseTime(course: ICourseDetail) {
    course.duration = 0;
    course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        course.duration += +chapter.duration;
      });
    });
    const formattedDuration = this.getFormattedDuration(course.duration);
    return formattedDuration;
    //console.log('this.course.duration  ', this.course.duration, this.course.watchedDuration);
  }

  getFormattedDuration(duration: number): string {
    const minutes = Math.round(duration % 60);
    const hours = Math.floor(minutes / 60);
    if (hours === 0) {
      return `${minutes} min`;
    }
    return `${hours} hr ${minutes} min`;
  }

}
