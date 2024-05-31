import { TestBed } from '@angular/core/testing';

import { BloodPressureChartService } from './blood-pressure-chart.service';

describe('BloodPressureChartService', () => {
  let service: BloodPressureChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodPressureChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
