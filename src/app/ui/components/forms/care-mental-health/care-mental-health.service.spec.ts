import { TestBed } from '@angular/core/testing';

import { CareMentalHealthService } from './care-mental-health.service';

describe('CareMentalHealthService', () => {
  let service: CareMentalHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareMentalHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
