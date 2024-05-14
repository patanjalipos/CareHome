import { TestBed } from '@angular/core/testing';

import { SmokingRiskAssessmentService } from './smoking-risk-assessment.service';

describe('SmokingRiskAssessmentService', () => {
  let service: SmokingRiskAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmokingRiskAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
