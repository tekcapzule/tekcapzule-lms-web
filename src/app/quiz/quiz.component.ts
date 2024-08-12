import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { ICourseDetail, IModule, IOption, IQuestion, IQuiz } from '@app/shared/models';
import { IUserAnswer, IValidateQuiz } from '@app/shared/models/quiz.model';
import { ICourseStatus, IStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizFinished:boolean = false;
  currentQuestionIndex:number = 0;
  quiz: IQuiz;
  questions: IQuestion[] = [];
  selectedOption: any[] = [];
  score: number;
  validateRequestBody: IValidateQuiz;
  isAnswerSelected: boolean;
  quizResult: any;
  selectedAnswer: string[] = [];
  isSubmitted: boolean;
  currentQuestion: IQuestion;
  isVideoListPage: boolean;
  isQuizAvailable: boolean;
  @Input() isVideoPlaying: boolean;
  @Input() course: ICourseDetail;
  @Input() module: IModule;
  @Input() courseStatus: ICourseStatus;
  playNextVideo = new EventEmitter();
  moduleIndex = 0;

  constructor(private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private dashboardApi: DashboradApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.isVideoListPage = true;
    this.loadQuizData();
  }

  loadQuizData() {
    this.moduleIndex = this.getIndex(this.course.modules, this.courseStatus.lastVisitedModule);
    this.quiz = this.module.quiz;
    if(this.quiz) {
      this.isQuizAvailable = true;
      this.questions = this.quiz.questions;
      this.currentQuestion = this.questions[0];
    }
  }

  getIndex(items: IModule[], serialNumber: number): number {
    const index = items.findIndex(item => item.serialNumber === serialNumber);
    return index === -1 ? 0 : index;
  }

  onOptionSelect(option: string) {
    this.isAnswerSelected = true;
    this.selectedAnswer = [option];
  }

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1) {
      this.isSubmitted = false;
      this.selectedAnswer = [];
      this.currentQuestionIndex ++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else if (!this.isVideoListPage && this.moduleIndex < this.course.modules.length) {
      this.moduleIndex++;
      this.quiz = this.course.modules[this.moduleIndex].quiz;
      this.questions = this.quiz.questions;
      this.currentQuestion = this.questions[0];
      this.currentQuestionIndex = 0;
      this.isSubmitted = false;
      this.selectedAnswer = [];      
    }
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  backToCourse() {
    this.courseStatus.modules[0].quizStatus = IStatus.COMPLETED; 
    this.dashboardApi.updateVideoStatus(this.courseStatus).subscribe(data => {
      this.playNextVideo.emit();
    });
  }
}
