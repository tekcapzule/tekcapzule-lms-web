import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TopicItem } from '@app/shared/models/topic-item.model';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {
  
  selectedTopic: string[] = [];
  selectedLevel: any[] = [];
  selectedDeliveryMode: any[] = [];
  topics: TopicItem[] = [
    { code: 'META', title: 'Metaverse'},
    { code: 'WEB3', title: 'Web 3.0'},
    { code: 'AI', title: 'Aritifical Intelligence'}
  ];
  levelCategories: any[] = [
    { name: 'Beginner', code: 'BEGINNER' },
    { name: 'Intermediate', code: 'INTERMEDIATE' },
    { name: 'Advanced', code: 'ADVANCED' },
    { name: 'Mixed', code: 'MIXED'}
  ];
  @Output() filterUpdate = new EventEmitter<any>();
  
  constructor() {}

  ngOnInit(): void {
      
  }

  onFilterChange(event: any, key: string) {
    this.filterUpdate.emit({
      'topic': this.selectedTopic, 'level': this.selectedLevel 
    });
  }
}
