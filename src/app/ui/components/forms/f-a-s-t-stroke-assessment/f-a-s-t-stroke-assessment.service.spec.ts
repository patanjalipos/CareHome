import { TestBed } from '@angular/core/testing';

import { FASTStrokeAssessmentService } from './f-a-s-t-stroke-assessment.service';

describe('FASTStrokeAssessmentService', () => {
  let service: FASTStrokeAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FASTStrokeAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
