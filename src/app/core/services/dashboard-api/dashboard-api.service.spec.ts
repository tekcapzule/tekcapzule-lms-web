import { TestBed } from '@angular/core/testing';

import { DashboradApiService } from './dashboard-api.service';

describe('DashboradApiService', () => {
  let service: DashboradApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboradApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
