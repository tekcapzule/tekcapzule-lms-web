import { Component, OnInit } from '@angular/core';
import { TopicItem } from '@app/shared/models/topic-item.model';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {
  topics: TopicItem[] = [
    { code: 'META', title: 'Metaverse'},
    { code: 'WEB3.0', title: 'Web 3.0'},
    { code: 'AI', title: 'Aritifical Intelligence'}
  ];
  levelCategories: any[] = [
    { name: 'BIGINNER', key: 'BIGINNER' },
    { name: 'INTERMEDIATE', key: 'INTERMEDIATE' },
    { name: 'High', key: 'HIGH' }
  ];
  deliveryMode: any[] = [
    { name: 'Online', key: 'ONLINE' },
    { name: 'Hybrid', key: 'HYBRID' },
    { name: 'In Classroom', key: 'IN_CLASSROOM' },
  ];
  
  constructor() {}

  ngOnInit(): void {
      
  }

}
