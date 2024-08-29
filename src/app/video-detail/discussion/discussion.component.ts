import { Component, Input, OnInit } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  @Input() course: ICourseDetail;
  discussionList = [{
    title: "Could you provide the pictures that you based the caricatures on?",
    answer: "Become a Machine Learning expert. Master the fundamentals of deep learning and break into AI. Recently updated with cutting-edge techniques!",
    question: "What is a Neural Network?",
    time: "2 years ago"
  }, {
    title: "How does artificial intelligence improve the accuracy of medical diagnoses?",
    answer: "Artificial intelligence (AI) improves the accuracy of medical diagnoses by analyzing large datasets of medical records, images, and other relevant data much faster than a human can.",
    question: "What is a Artificial Intelligience?",
    time: "1 years ago"
  }];
  filterList: any[] = [];
  searchText: string;

  constructor(
  ) {}

  ngOnInit(): void {
    this.filterList = this.discussionList;
  }
  
  onFilter() {
    if(this.searchText) {
      this.filterList = this.discussionList.filter(dl => dl.title.includes(this.searchText) || dl.answer.includes(this.searchText) || dl.question.includes(this.searchText));
    } else {
      this.filterList = this.discussionList;

    }
  }

}
