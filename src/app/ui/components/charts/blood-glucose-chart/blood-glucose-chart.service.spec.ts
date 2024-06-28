import { TestBed } from '@angular/core/testing';

import { BloodGlucoseChartService } from './blood-glucose-chart.service';

describe('BloodGlucoseChartService', () => {
  let service: BloodGlucoseChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodGlucoseChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
