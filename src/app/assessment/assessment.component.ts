import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CourseApiService } from '@app/core';
import { AuthStateService } from '@app/core/services';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail, IOption, IQuestion, IQuiz } from '@app/shared/models';
import { IUserAnswer, IValidateQuiz } from '@app/shared/models/quiz.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
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
  course: ICourseDetail;
  pdfSource: SafeResourceUrl;
  isPDFLoaded: boolean;
  answer: any;

  constructor(private courseApi: CourseApiService,
    private initService: InitService,
    private route: ActivatedRoute,
    private authState: AuthStateService,
    private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadQuizData(params['code']);
    });
  }

  loadQuizData(courseId: string) {
    this.courseApi.getCourse([courseId]).subscribe((data) => {
      this.course = data[0];
      this.quiz = this.course.assessment;
      this.questions = this.quiz.questions;
      this.validateRequestBody = {
        courseId: data[0].courseId,
        quizId: this.quiz.quizId,
        userAnswers: []
      }
    });
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
    this.courseApi.validateQuizAnswer(this.validateRequestBody).subscribe(data => {
      this.quizFinished = true;
      this.quizResult = data;
      console.log('  submitAnswer  --- ', data);
    });
  }

  loadCertificate() {
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
