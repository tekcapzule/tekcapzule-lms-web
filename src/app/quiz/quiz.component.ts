import { Component, OnInit } from '@angular/core';
import { CourseApiService } from '@app/core';
import { IQuestion } from '@app/shared/models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizFinished:boolean = false;
  currentQuestionIndex:number = 0;
  questions: IQuestion[] = [];
  selectedOption: number[] = [];
  score: number;

  constructor(private courseApi: CourseApiService) {}


  ngOnInit(): void {
    this.loadQuizData();
  }

  loadQuizData() {
    this.courseApi.getCourseQuiz().subscribe((data) => {
      this.questions = data.quiz;
    });
  }

  onOptionSelect(optionId: number) {
    this.selectedOption[this.currentQuestionIndex] = optionId;
  }

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex ++;
    }
  }

  submitAnswer() {
    console.log(' this.sell ', this.selectedOption);
  }
  
  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
  }
}
