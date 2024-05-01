import { TestBed } from '@angular/core/testing';

import { CareSleepAndRestingAssessmentService } from './care-sleep-and-resting-assessment.service';

describe('CareSleepAndRestingAssessmentService', () => {
  let service: CareSleepAndRestingAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareSleepAndRestingAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
