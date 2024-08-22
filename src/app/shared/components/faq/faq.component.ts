import { Component, Input } from '@angular/core';
import { IFAQ } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent {
  @Input() faqs: IFAQ[] = [];

  constructor() {}

}
