import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSpinnerService, DashboradApiService } from '@app/core';
import { ICourseDetail, IModule, IQuestion, IQuiz } from '@app/shared/models';
import { IValidateQuiz } from '@app/shared/models/quiz.model';
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
  @Input() courseStatus: ICourseStatus;
  @Output() quizCompleted = new EventEmitter();
  @Input() moduleIndex = 0;

  constructor( private dashboardApi: DashboradApiService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    this.isVideoListPage = true;
  }

  loadQuizData() {
    this.currentQuestionIndex = 0;
    this.quiz = this.course.modules[this.moduleIndex].quiz;
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
    this.spinner.show();
    this.courseStatus.modules[this.moduleIndex].quizStatus = IStatus.COMPLETED; 
    this.dashboardApi.updateVideoStatus(this.courseStatus).subscribe(data => {
      this.quizCompleted.emit();
      this.spinner.hide();
    });
  }
}
