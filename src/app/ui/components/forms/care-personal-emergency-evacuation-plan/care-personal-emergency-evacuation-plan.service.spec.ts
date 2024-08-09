import { TestBed } from '@angular/core/testing';

import { CarePersonalEmergencyEvacuationPlanService } from './care-personal-emergency-evacuation-plan.service';

describe('CarePersonalEmergencyEvacuationPlanService', () => {
  let service: CarePersonalEmergencyEvacuationPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarePersonalEmergencyEvacuationPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
