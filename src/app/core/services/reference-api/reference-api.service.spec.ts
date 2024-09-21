import { TestBed } from '@angular/core/testing';

import { ReferenceApiService } from './reference-api.service';

describe('ReferenceApiService', () => {
  let service: ReferenceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
