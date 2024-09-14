import { Component, OnInit } from '@angular/core';
import { ReferenceApiService } from '@app/core';
import { IReferenceDetail } from '@app/shared/models/reference-item.model';



@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {

  referenceList: IReferenceDetail[] = [];
  filterList: IReferenceDetail[] = [];

  selectedTopic: string[] = [];
  selectedLevel: string[] = [];

  constructor(private referenceApi: ReferenceApiService) {

  }

  ngOnInit(): void {
    this.getAllReferences();
  }

  getAllReferences() {
    this.referenceApi.getAllReference().subscribe(references => {
      this.referenceList = references;
      this.filterList = references;
      console.log("My Reference", this.referenceList);
    });
  }


  onFilterUpdate(selectedFilters: any) {
    this.selectedTopic = selectedFilters.topic;
    this.selectedLevel = selectedFilters.level;
    this.filterReference();
    console.log("selected topic:", this.selectedTopic);
  }
  filterReference() {
    let tempList = [...this.referenceList];
    if (this.selectedTopic.length) {
      tempList = tempList.filter(t1 =>
        this.selectedTopic.includes(t1.topicCode)
      )
    }
    if(this.selectedLevel.length) {
      tempList = tempList.filter(t1 =>
        this.selectedLevel.includes(t1.level)
      )
    }
    this.filterList = tempList;

  }
}

