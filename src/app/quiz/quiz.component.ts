import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  moduleIndex: number = 0;
  isVideoListPage: boolean;
  isQuizAvailable: boolean;

  constructor(private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['moduleIndex'] || params['moduleIndex'] === 0) {
        this.isVideoListPage = true;
        this.moduleIndex = parseInt(params['moduleIndex']);
      }
      if(this.courseApi.currentCourse && this.courseApi.currentCourse.courseId === params['code']) {
        this.course = this.courseApi.currentCourse;
        this.loadQuizData();
      } else {
        this.getCourse(params['code']);
      }
    });
  }

  
  getCourse(courseId: string) {
    this.courseApi.getCourse([courseId]).subscribe((data) => {
      this.course = data[0];
      this.loadQuizData();
    });
  }

  loadQuizData() {
    this.quiz = this.course.modules[this.moduleIndex].quiz;
    if(this.quiz) {
      this.isQuizAvailable = true;
      this.questions = this.quiz.questions;
      this.currentQuestion = this.questions[0];
    }
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
    this.router.navigateByUrl('/lms/video-detail/'+ this.course.courseId);
  }
}
