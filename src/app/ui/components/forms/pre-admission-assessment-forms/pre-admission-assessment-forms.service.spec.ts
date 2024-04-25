import { TestBed } from '@angular/core/testing';

import { PreAdmissionAssessmentFormsService } from './pre-admission-assessment-forms.service';

describe('PreAdmissionAssessmentFormsService', () => {
  let service: PreAdmissionAssessmentFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreAdmissionAssessmentFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
