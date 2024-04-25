import { TestBed } from '@angular/core/testing';

import { CareAssessmentDietaryNotificationService } from './care-assessment-dietary-notification.service';

describe('CareAssessmentDietaryNotificationService', () => {
  let service: CareAssessmentDietaryNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareAssessmentDietaryNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
