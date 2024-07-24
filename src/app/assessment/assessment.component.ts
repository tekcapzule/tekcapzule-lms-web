import { Component, OnInit } from '@angular/core';
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
  pdfSource: string;
  isPDFLoaded: boolean;

  constructor(private courseApi: CourseApiService,
    private initService: InitService,
    private route: ActivatedRoute,
    private authState: AuthStateService) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadQuizData(params['code']);
    });
  }

  loadQuizData(courseId: string) {
    this.courseApi.getCourse([courseId]).subscribe((data) => {
      this.course = data[0];
      this.quiz = this.course.quiz;
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
    const answer = this.validateRequestBody.userAnswers.find((answer: IUserAnswer) => answer.questionId === questionId);
    if(answer) {
      answer.selectedAnswers = [option];
    } else {
      this.validateRequestBody.userAnswers.push({questionId: questionId, selectedAnswers: [option]});
    }
  }

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex ++;
    }
  }

  submitAnswer() {
    console.log(' this.sell ', this.selectedOption);
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
      const blob = new Blob([data], { type: 'application/pdf' });
      this.pdfSource = URL.createObjectURL(blob);
      console.log('this.pdfSource -- ', this.pdfSource);
      this.isPDFLoaded = true;
    });
  }
  
  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
  }

  onBack() {

  }
}
