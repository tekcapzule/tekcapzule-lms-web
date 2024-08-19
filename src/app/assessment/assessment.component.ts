import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppSpinnerService, CourseApiService } from '@app/core';
import { AuthStateService } from '@app/core/services';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail, IOption, IQuestion, IQuiz } from '@app/shared/models';
import { IUserAnswer, IValidateQuiz } from '@app/shared/models/quiz.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./../quiz/quiz.component.scss']
})
export class AssessmentComponent implements OnInit {
  quizFinished:boolean = false;
  currentQuestionIndex:number = 0;
  quiz: IQuiz;
  questions: IQuestion[] = [];
  selectedOption: any[] = [];
  score: number;
  validateRequestBody: IValidateQuiz;
  isAnswerSelected: boolean;
  quizResult: any;
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  pdfSource: SafeResourceUrl;
  isPDFLoaded: boolean;
  answer: any;

  constructor(private courseApi: CourseApiService,
    private initService: InitService,
    private spinner: AppSpinnerService,
    private authState: AuthStateService,
    private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.loadQuizData();
  }

  loadQuizData() {
    this.quiz = this.course.assessment;
    this.questions = this.quiz.questions;
    this.validateRequestBody = {
      courseId: this.course.courseId,
      quizId: this.quiz.quizId,
      userAnswers: []
    }
  }

  onOptionSelect(option: string) {
    this.isAnswerSelected = true;
    const questionId = this.questions[this.currentQuestionIndex].questionId;
    this.answer = this.validateRequestBody.userAnswers.find((answer: IUserAnswer) => answer.questionId === questionId);
    if(this.answer) {
      this.answer.selectedAnswers = [option];
    } else {
      this.answer = {questionId: questionId, selectedAnswers: [option]};
      this.validateRequestBody.userAnswers.push(this.answer);
    }
  }

  lastQuestion() {
    if(this.currentQuestionIndex > 0 ) {
      this.currentQuestionIndex --;
      const questionId = this.questions[this.currentQuestionIndex].questionId;
      this.answer = this.validateRequestBody.userAnswers.find((answer: IUserAnswer) => answer.questionId === questionId);
    }
  }
  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex ++;
      const questionId = this.questions[this.currentQuestionIndex].questionId;
      this.answer = this.validateRequestBody.userAnswers.find((answer: IUserAnswer) => answer.questionId === questionId);
    }
  }

  submitAnswer() {    
    this.spinner.show();
    this.courseApi.validateQuizAnswer(this.validateRequestBody).subscribe(data => {
      this.quizFinished = true;
      this.quizResult = data;
      this.spinner.hide();
      console.log('  submitAnswer  --- ', data);
    });
  }

  loadCertificate() {
    this.spinner.show();
    const requestBody = {
      userId: this.authState.getEmail(),
      firstName: this.authState.getFirstName(),
      lastName: this.authState.getLastName(),
      courseId: this.course.courseId,
      courseName: this.course.title,
      courseInstructor: this.course.author,
      courseDuration: 24,
      certificateType: "certificate"
    }
    this.initService.downloadCertificate(requestBody).subscribe(data => {
      const contentType = 'application/pdf';
      const blob = this.base64ToBlob(data, contentType);
      const url = URL.createObjectURL(blob);
      this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.isPDFLoaded = true;
      this.spinner.hide();
    });
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }


  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
  }

  onBack() {

  }
}
