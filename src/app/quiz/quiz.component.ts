import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseApiService } from '@app/core';
import { IOption, IQuestion, IQuiz } from '@app/shared/models';
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

  constructor(private courseApi: CourseApiService,
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadQuizData(params['code']);
    });
  }

  loadQuizData(courseId: string) {
    this.courseApi.getCourse([courseId]).subscribe((data) => {
      this.quiz = data[0].quiz;
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
    this.selectedAnswer = [option];
  }

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex ++;
    }
  }

  onSubmit() {
    if(this.questions[this.currentQuestionIndex].correctAnswer[0] === this.selectedAnswer[0]) {
      
    }
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
