import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseApiService } from '@app/core';
import { ICourseDetail, IOption, IQuestion, IQuiz } from '@app/shared/models';
import { IUserAnswer, IValidateQuiz } from '@app/shared/models/quiz.model';

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
  course: ICourseDetail;

  constructor(private courseApi: CourseApiService,
    private route: ActivatedRoute) {}


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
      this.currentQuestion = this.questions[0];
      this.validateRequestBody = {
        courseId: data[0].courseId,
        quizId: this.quiz.quizId,
        userAnswers: []
      }
    });
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
    }
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  submitAnswer() {
    console.log(' this.sell ', this.selectedOption);
    this.courseApi.validateQuizAnswer(this.validateRequestBody).subscribe(data => {
      this.quizFinished = true;
      this.quizResult = data;
      console.log('  submitAnswer  --- ', data);
    })
  }
  
  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
  }

  onBack() {

  }
}
