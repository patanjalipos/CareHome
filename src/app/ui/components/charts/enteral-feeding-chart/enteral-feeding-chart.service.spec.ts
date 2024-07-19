import { TestBed } from '@angular/core/testing';

import { EnteralFeedingChartService } from './enteral-feeding-chart.service';

describe('EnteralFeedingChartService', () => {
  let service: EnteralFeedingChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnteralFeedingChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
