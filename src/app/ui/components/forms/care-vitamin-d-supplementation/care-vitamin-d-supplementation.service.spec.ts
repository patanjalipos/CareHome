import { TestBed } from '@angular/core/testing';

import { CareVitaminDSupplementationService } from './care-vitamin-d-supplementation.service';

describe('CareVitaminDSupplementationService', () => {
  let service: CareVitaminDSupplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareVitaminDSupplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
