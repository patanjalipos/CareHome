import { TestBed } from '@angular/core/testing';

import { OralHealthRiskAndOralPlanService } from './oral-health-risk-and-oral-plan.service';

describe('OralHealthRiskAndOralPlanService', () => {
  let service: OralHealthRiskAndOralPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OralHealthRiskAndOralPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
