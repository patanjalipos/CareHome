import { TestBed } from '@angular/core/testing';

import { DeliriumRiskAndRiskReductionService } from './delirium-risk-and-risk-reduction.service';

describe('DeliriumRiskAndRiskReductionService', () => {
  let service: DeliriumRiskAndRiskReductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliriumRiskAndRiskReductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
