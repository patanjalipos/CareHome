import { TestBed } from '@angular/core/testing';

import { ActivityChartService } from './activity-chart.service';

describe('ActivityChartService', () => {
  let service: ActivityChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
