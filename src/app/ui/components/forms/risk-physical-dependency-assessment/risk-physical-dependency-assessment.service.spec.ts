import { TestBed } from '@angular/core/testing';

import { RiskPhysicalDependencyAssessmentService } from './risk-physical-dependency-assessment.service';

describe('RiskPhysicalDependencyAssessmentService', () => {
  let service: RiskPhysicalDependencyAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskPhysicalDependencyAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
