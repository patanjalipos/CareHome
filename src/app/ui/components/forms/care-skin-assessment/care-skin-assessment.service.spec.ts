import { TestBed } from '@angular/core/testing';

import { CareSkinAssessmentService } from './care-skin-assessment.service';

describe('CareSkinAssessmentService', () => {
  let service: CareSkinAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareSkinAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
