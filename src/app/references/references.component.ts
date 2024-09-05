import { Component } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {

  selectedTopic: string[] = [];
  selectedLevel: string[] = [];

  onFilterUpdate(selectedFilters: any) {
    this.selectedTopic = selectedFilters.topic;
    this.selectedLevel = selectedFilters.level;
    this.filterCourse();
  }
  filterCourse() {
  }

}
