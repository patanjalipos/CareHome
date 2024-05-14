import { TestBed } from '@angular/core/testing';

import { CareAssessmentMyEpilepsyService } from './care-assessment-my-epilepsy.service';

describe('CareAssessmentMyEpilepsyService', () => {
  let service: CareAssessmentMyEpilepsyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareAssessmentMyEpilepsyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
