import { TestBed } from '@angular/core/testing';

import { RiskWaterlowPressureUlcerService } from './risk-waterlow-pressure-ulcer.service';

describe('RiskWaterlowPressureUlcerService', () => {
  let service: RiskWaterlowPressureUlcerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskWaterlowPressureUlcerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
