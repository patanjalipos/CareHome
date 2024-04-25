import { TestBed } from '@angular/core/testing';

import { CareHearingAssessmentService } from './care-hearing-assessment.service';

describe('CareHearingAssessmentService', () => {
  let service: CareHearingAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareHearingAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
