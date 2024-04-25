import { TestBed } from '@angular/core/testing';

import { CareFeelingFreshAndCleanService } from './care-feeling-fresh-and-clean.service';

describe('CareFeelingFreshAndCleanService', () => {
  let service: CareFeelingFreshAndCleanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareFeelingFreshAndCleanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
