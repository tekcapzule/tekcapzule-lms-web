import { Injectable } from '@angular/core';
import { ErrorModel } from '@app/shared/models';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private messageService: MessageService) {}

  showSuccess(msg: any): void {
    this.messageService.add({ key: 'tc', severity: 'success', detail: msg });
  }

  getInternalErrorMessage(): ErrorModel {
    return {
      key: 'tc',
      severity: 'error',
      // summary: 'Error',
      detail: 'Oops! Something went wrong!',
    };
  }
}
